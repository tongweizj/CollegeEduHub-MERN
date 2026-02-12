import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//    npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute';
// Layout
import AdminLayout from './layout/AdminLayout';
import MainLayout from './layout/StudentLayout';
import AuthLayout from './layout/AuthLayout';
//

import Home from './pages/Home';
import Login from './pages/login/Login';
import Courses from './pages/courses';

import ShowArticle from './pages/article/ShowArticle';
import ListArticles from "./pages/article/ListArticles";

// Admin
import AdminLogin from './admin/login';

import Dashboard from './admin/dashboard';

import CreateUser from './admin/user/create';
import ShowUser from './admin/user/show';
import List from './admin/user/list';
import EditUser from './admin/user/edit';

import AdminCourses from './admin/courses';
import CreateCourse from './admin/courses/create';
import ShowCourse from './admin/courses/show';
import EditCourse from './admin/courses/edit';

import AdminStudents from './admin/students';
import CreateStudent from './admin/students/create';
import ShowStudent from './admin/students/show';
import EditStudent from './admin/students/edit';

import Articles from "./admin/articles";
import EditArticle from './admin/articles/edit';
import CreateArticle from './admin/articles/create';
import Article from './admin/articles/show';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="admin/login" element={< AdminLogin />} />
            <Route path="login" element={< Login />} />
            <Route path="signup" element={< CreateUser />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            {/* TODO */}
            <Route path="courses" element={<ProtectedRoute>< Courses /></ProtectedRoute>} />
            {/* TO Delete */}
            <Route path="articles" element={< ListArticles />} />
            <Route path="article/:id" element={< ShowArticle />} />
          </Route>

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={< Dashboard />} />
            <Route path="user/create" element={< CreateUser />} />
            <Route path="user/:id" element={< ShowUser />} />
            <Route path="user/edit/:id" element={< EditUser />} />
            <Route path="users" element={< List />} />
            {/* TODO */}
            <Route path="courses" element={< AdminCourses />} />
            <Route path="course/create" element={< CreateCourse />} />
            <Route path="course/:id" element={< ShowCourse />} />
            <Route path="course/edit/:id" element={< EditCourse />} />

            <Route path="students" element={< AdminStudents />} />
            <Route path="student/create" element={< CreateStudent />} />
            <Route path="student/:id" element={< ShowStudent />} />
             <Route path="student/edit/:id" element={< EditStudent />} />
             
            {/* TO Delete */}
            <Route path="articles" element={< Articles />} />
            <Route path="article/:id" element={< Article />} />
            <Route path="article/create" element={< CreateArticle />} />
            <Route path="article/edit/:id" element={< EditArticle />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
