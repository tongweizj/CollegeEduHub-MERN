import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

import SignUp from './pages/SignUp';
import Login from './pages/Login';

import Home from './pages/Home';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';

import EditStudent from './pages/student/EditStudent';
import StudentList from './pages/student/StudentList';
import Student from './pages/student/Student';
import DeleteStudent from './pages/student/DeleteStudent';
import EnrollCourses from './pages/student/EnrollCourses';

import Courses from './pages/course/Index';
import AddCourse from './pages/course/Add';
import EditCourse from './pages/course/Edit';
import Course from './pages/course/course';
function App() {
  return (
    <Router>
      <AppNavbar />


      <Container className="mt-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="studentlist" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
          <Route path="student/:id" element={<ProtectedRoute><Student /></ProtectedRoute>} />
          <Route path="editstudent/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
          <Route path="deletestudent" element={<ProtectedRoute><DeleteStudent /></ProtectedRoute>} />
          <Route path="enrollcourses/:id" element={<ProtectedRoute><EnrollCourses /></ProtectedRoute>} />

          <Route path="courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="course/add" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
          <Route path="course/edit/:id" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
          <Route path="course/:id" element={<Course />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;