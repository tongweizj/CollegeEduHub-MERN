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

import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="editstudent/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
          <Route path="deletestudent" element={<ProtectedRoute><DeleteStudent /></ProtectedRoute>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;