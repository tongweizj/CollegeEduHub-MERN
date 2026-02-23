const Course = require('../models/course');
const Student = require('../models/Student');

const courseResolvers = {
     Query: {
        courses: async () => {
          try {
            const courses = await Course.find();
            return courses.map((course) => ({
              id: course._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
              ...course.toObject(),
            }));
          } catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Failed to fetch courses');
          }
        },
        course: async (_, { id }) => {
          try {
            const course = await Course.findById(id);
            if (!course) {
              throw new Error(`Courses with ID ${id} not found`);
            }
            return {
              id: course._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
              ...course.toObject(),
            };
          } catch (error) {
            console.error('Error fetching course by ID:', error);
            throw new Error('Failed to fetch course');
          }
        },
      },
      Mutation: {
        addCourse: async (_, args) => {
          try {
            const course = new Course(args);
            const newCourse = await course.save();
            return {
              id: newCourse._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
              ...newCourse.toObject(),
            };
          } catch (error) {
            console.error('Error adding course:', error);
            throw new Error('Failed to add course');
          }
        },
        updateCourse: async (_, { id, ...update }) => {
          try {
            const updateCourse = await Course.findByIdAndUpdate(id, update, { new: true });
            if (!updateCourse) {
              throw new Error(`Course with ID ${id} not found`);
            }
            return {
              id: updateCourse._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
              ...updateCourse.toObject(),
            };
          } catch (error) {
            console.error('Error updating course:', error);
            throw new Error('Failed to update course');
          }
        },
        deleteCourse: async (_, { id }) => {
          try {
            const deletedCourse = await Course.findByIdAndDelete(id);
            if (!deletedCourse) {
              throw new Error(`Course with ID ${id} not found`);
            }
            return {
              id: deletedCourse._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
              ...deletedCourse.toObject(),
            };
          } catch (error) {
            console.error('Error deleting course:', error);
            throw new Error('Failed to delete course');
          }
        },
    },
    Course: {
    students: async (parent) => {
      // 这里的 parent 就是当前这门课程的数据
      // 我们去 Student 集合里查：哪些学生的 enrolledCourse 数组里，包含了这门课的 parent._id？
      
      return await Student.find({ enrolledCourse: parent._id });
    }
  }
    };

module.exports = courseResolvers;