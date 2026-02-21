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
import EditStudent from './pages/EditStudent';
import StudentList from './pages/StudentList';
import DeleteStudent from './pages/DeleteStudent';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      {/* 优化点 1: 确保 Navbar 样式正确 */}
      <Navbar bg="primary" variant="dark" expand="lg" className="px-5">
        {/* 优化点 2: 使用 fluid 使 Container 撑满全屏宽度 */}
        <Container>
          <Navbar.Brand as={Link} to="/home">
            Student Enrollment System
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            {/* 优化点 3: 使用 ms-auto (Bootstrap 5) 或 ml-auto (Bootstrap 4) 将菜单推向右侧 */}
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/studentlist">Student List</Nav.Link>
              <Nav.Link as={Link} to="/deletestudent">Delete Student</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path="editstudent/:id" element={<EditStudent />} />
          <Route path="deletestudent" element={<DeleteStudent />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;