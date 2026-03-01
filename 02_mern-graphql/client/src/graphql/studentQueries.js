import { gql } from '@apollo/client';

export const ADD_STUDENT = gql`
    mutation AddStudent(
        $studentNumber: String!, $password: String!, $firstName: String!,
        $lastName: String!, $address: String!, $city: String!,
        $phoneNumber: String!, $email: String!, $program: String!       
    ) {
        addStudent(        
            studentNumber: $studentNumber, password: $password,
            firstName: $firstName, lastName: $lastName,
            address: $address, city: $city,
            phoneNumber: $phoneNumber, email: $email, program: $program
        ) { id }
    }
`;

export const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
       id
       studentNumber
       password
       firstName
       lastName
       address
       email
       city
       phoneNumber
       program
      enrolledCourse {
      id
      courseName
      courseCode
      section
      semester
    }
    }
  }
`;

export const GET_STUDENTS = gql`
query Students {
  students {
    address
    city
    email
    enrolledCourse {
      courseCode
      courseName
      id
      section
      semester
    }
    firstName
    id
    lastName
    password
    phoneNumber
    program
    studentNumber
  }
}
`;
export const Get_StudentAndCourses = gql`
query GetStudentAndCourses($id: String!) {
  student(id: $id) {
    studentNumber
    firstName
    # 这里会自动触发 Student.enrolledCourse 的 resolver 去查数据库
    enrolledCourse { 
      courseCode
      courseName
    }
  }
}
  `;
export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: ID!, 
    $studentNumber: String!, 
    $password: String!,
    $firstName: String!, 
    $lastName: String!, 
    $address: String!,
    $city: String!, 
    $phoneNumber: String!, 
    $email: String!, 
    $program: String!) {
    updateStudent(
      id: $id, 
      studentNumber: $studentNumber, 
      password: $password,
      firstName: $firstName, 
      lastName: $lastName, 
      address: $address,
      city: $city, 
      phoneNumber: $phoneNumber, 
      email: $email, 
      program: $program) {
      id
      firstName
      lastName
    }
  }
`;
export const  UPDATE_EnrollStudentInCourse = gql`
mutation EnrollStudentInCourse($studentId: ID!, $courseId: ID!) {
  enrollStudentInCourse(studentId: $studentId, courseId: $courseId) {
  id
    firstName
    # 选课成功后，直接连带查出他现在拥有的所有课程详情！
    enrolledCourse {
      id
      courseName
      courseCode
    }  
  }
}
  `;
export const DELETE_STUDENT_EMAIL = gql`
mutation DeleteStudentByEmail($email: String!) {
  deleteStudentByEmail(email: $email) {
    address
    id
  }
}
`;

export const DELETE_STUDENT_ID = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id) { 
      id
      firstName
      lastName 
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      token
      user {
        id
        studentNumber
        lastName
        firstName
      }
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation LogOut {
    logOut
  }
`;
export const ENROLL_STUDENT_IN_COURSES = gql`
mutation EnrollStudentInCourses($studentId: ID!, $courseIds: [ID!]!) {
  enrollStudentInCourses(studentId: $studentId, courseIds: $courseIds) {
    id
    firstName
    enrolledCourse {
      id
      courseName
    }
  }
}
`;