// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // 如果没有 token，重定向到登录页面
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 如果有 token，渲染子组件（即受保护的页面）
  return children;
};

export default ProtectedRoute;