// resolvers.js Code for the resolvers of the GraphQL server
const Student = require('../models/Student');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const resolvers = {
  Query: {
    students: async () => {
      try {
        const students = await Student.find();
        return students.map((student) => ({
          id: student._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
          ...student.toObject(),
        }));
      } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Failed to fetch students');
      }
    },
    student: async (_, { id }) => {
      try {
        const student = await Student.findById(id);
        if (!student) {
          throw new Error(`Student with ID ${id} not found`);
        }
        return {
          id: student._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
          ...student.toObject(),
        };
      } catch (error) {
        console.error('Error fetching student by ID:', error);
        throw new Error('Failed to fetch student');
      }
    },
  },
  Mutation: {
    addStudent: async (_, args) => {
      try {
        const student = new Student(args);
        const newStudent = await student.save();
        return {
          id: newStudent._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
          ...newStudent.toObject(),
        };
      } catch (error) {
        console.error('Error adding student:', error);
        throw new Error('Failed to add student');
      }
    },
    updateStudent: async (_, { id, ...update }) => {
      try {
        const updatedStudent = await Student.findByIdAndUpdate(id, update, { new: true });
        if (!updatedStudent) {
          throw new Error(`Student with ID ${id} not found`);
        }
        return {
          id: updatedStudent._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
          ...updatedStudent.toObject(),
        };
      } catch (error) {
        console.error('Error updating student:', error);
        throw new Error('Failed to update student');
      }
    },
    deleteStudent: async (_, { id }) => {
      try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
          throw new Error(`Student with ID ${id} not found`);
        }
        return {
          id: deletedStudent._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
          ...deletedStudent.toObject(),
        };
      } catch (error) {
        console.error('Error deleting student:', error);
        throw new Error('Failed to delete student');
      }
    },
    deleteStudentByEmail: async (_, { email }) => {
      try {
        const deletedStudent = await Student.findOneAndDelete({ email });
        if (!deletedStudent) {
          throw new Error(`Student with email ${email} not found`);
        }
        return {
          id: deletedStudent._id.toString(),
          ...deletedStudent.toObject(),
        };
      } catch (error) {
        console.error('Error deleting student:', error);
        throw new Error('Failed to delete student');
      }
    },

    login: async (_, { studentNumber, password }) => {
      // 1. 根据studentNumber查找用户
      const user = await Student.findOne({ studentNumber });
      if (!user) {
        throw new GraphQLError('用户不存在', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      console.log("user:", user.password)
      console.log("password:", password)

      // 2. 验证密码
      // const isValidPassword = await bcrypt.compare(password, user.password);
      // if (!isValidPassword) {
      //   throw new GraphQLError('密码错误', {
      //     extensions: { code: 'BAD_USER_INPUT' },
      //   });
      // }
      if (password !== user.password) {
        throw new GraphQLError('密码错误', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      // 3. 生成 JWT
      const JWT_SECRET = 'your_super_secret_key_123'; // 生产环境中请使用环境变量
      const token = jwt.sign(
        { id: user._id, studentNumber: user.studentNumber }, 
        JWT_SECRET, 
        { expiresIn: '24h' }
      );
      console.log("token:", token)
      return { token, user };
    }
  } 
  
};

module.exports = resolvers;
