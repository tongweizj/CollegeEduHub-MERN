import { gql } from '@apollo/client';

export const ADD_COURSE = gql`
    mutation AddCourse($courseCode: String!, $courseName: String!, $section: String!, $semester: String!) {
      addCourse(courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
        id
        courseCode
  }
}
`;

export const GET_COURSE = gql`
query Course($courseId: ID!) {
  course(id: $courseId) {
    id
    courseName
    courseCode
    section
    semester
    students {
      id
      lastName
      firstName
      program
      studentNumber
      email
    }
  }
}
`;

export const GET_COURSES = gql`
query Courses {
  courses {
    courseCode
    courseName
    id
    section
    semester
  }
}
`;
export const GET_COURSEAndStudents = gql`
query GetCourseAndStudents($id: String!) {
  course(id: $id) {
    courseName
    # 这里会自动触发 Course.students 的 resolver 去查数据库
    students {
      firstName
      lastName
      email
    }
  }
}
`;
export const EDIT_COURSE = gql`
 mutation UpdateCourse($updateCourseId: ID!, $courseCode: String!, $courseName: String!, $section: String!, $semester: String!) {
  updateCourse(id: $updateCourseId, courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
    courseCode
    courseName
    id
    section
    semester
  }
}
`;
export const DELETE_COURSE = gql`
mutation DeleteCourse($deleteCourseId: ID!) {
  deleteCourse(id: $deleteCourseId) {
    id
  }
}
  `;