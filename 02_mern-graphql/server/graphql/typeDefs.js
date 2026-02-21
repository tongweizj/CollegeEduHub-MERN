// typeDefs.js is a file that contains the GraphQL 
// schema definition language (SDL) that defines the types, 
// queries, and mutations that the GraphQL server supports. 
// The schema is defined using the GraphQL schema definition 
// language (SDL).
const typeDefs = `#graphql
  type Student {
    id: ID!
    studentNumber: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    phoneNumber: String!
    email: String!
    program: String!
    enrolledCourse: [Course]
  }
  
  type AuthData {
    token: String!
    user: Student!
  }
  
  type Course {
      id: ID!
      courseCode: String!
      courseName: String!
      section: String!
      semester: String!
  }

  # 3. 定义查询入口 (Query)
  type Query {
    students: [Student]
    student(id: ID!): Student
    courses: [Course]
    course(id: ID!): Course
  }

  # 4. 定义变更入口 (Mutation)
  type Mutation {
    addStudent(
      studentNumber: String!,
      password: String!,
      firstName: String!,
      lastName: String!,
      address: String!
      city: String!
      phoneNumber: String!
      email: String!,
      program: String!
    ): Student

    # 登录
    login(studentNumber: String!, password: String!): AuthData

    updateStudent(
      id: ID!
      studentNumber: String!
      password: String!
      firstName: String!
      lastName: String!
      address: String!
      city: String!
      phoneNumber: String!
      email: String!
      program: String!
    ): Student
    
    deleteStudent(id: ID!): Student
    
    deleteStudentByEmail(email: String!): Student

    enrollStudentInCourse(studentId: ID!, courseId: ID!): Student

    addCourse(
      courseCode: String!,
      courseName: String!,
      section: String!,
      semester: String!
    ): Course

    updateCourse(
      id: ID!,
      courseCode: String!,
      courseName: String!,
      section: String!,
      semester: String!
    ):Course

    deleteCourse(id: ID!): Course
  }
`;

module.exports = typeDefs;
