import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION,LOGOUT_MUTATION } from '../graphql/studentQueries';

/**
 * Custom hook for student authentication and session management.
 * 用于学生身份验证和会话管理的自定义 Hook。
 */
export const useAuth = (navigate) => {
  // Apollo useMutation hook for executing the login operation
  // 用于执行登录操作的 Apollo useMutation 钩子
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  /**
   * Executes the login process, stores credentials, and redirects the user.
   * 执行登录流程，存储凭证并重定向用户。
   * @param {string} studentNumber - The unique student identifier / 学生学号
   * @param {string} password - The account password / 账户密码
   */
  const performLogin = async (studentNumber, password) => {
    try {
      const response = await loginMutation({
        variables: { studentNumber, password }
      });

      if (response.data?.login) {
        const { token, user } = response.data.login;

        // 💾 Persist authentication data in browser storage
        // 💾 在浏览器本地存储中持久化身份验证数据
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        console.log('Login successful:', user);
        
        // Redirect to home page upon successful authentication
        // 身份验证成功后重定向至首页
        navigate('/home'); 
        return { success: true };
      }
    } catch (err) {
      console.error('Login failed:', err.message);
      return { success: false, message: err.message };
    }
  };

  /**
   * Helper function to verify if a valid session exists.
   * 检查是否存在有效会话的辅助函数。
   * @returns {boolean} True if token exists / 如果 token 存在则返回 true
   */
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  /**
   * Retrieves and parses the current user data from storage.
   * 从存储中获取并解析当前用户信息。
   * @returns {Object|null} The user object or null if not found / 用户对象，若未找到则返回 null
   */
  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  /**
   * Clears session data and redirects the user to the login page.
   * 清除会话数据并将用户重定向至登录页面。
   */
  const logout =async () => {
    try {
      // 1. 通知后端清除 Cookie
      await logoutMutation();
      
      // 2. 清除前端存储的用户信息
      localStorage.removeItem('user');
      
      // 3. 重定向到登录页
      navigate('/login');
      
      console.log('Logged out successfully and cookie cleared.');
    } catch (err) {
      console.error('Logout failed:', err.message);
      // 即便后端失败，前端通常也要清理掉本地状态
      localStorage.removeItem('user');
      navigate('/login');
    }
  };


  return { performLogin, logout, loading, error, isAuthenticated, getCurrentUser };
};