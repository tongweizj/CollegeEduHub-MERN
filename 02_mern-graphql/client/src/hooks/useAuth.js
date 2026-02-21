import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/studentQueries';

export const useAuth = (navigate) => {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const performLogin = async (studentNumber, password) => {
    try {
      const response = await loginMutation({
        variables: { studentNumber, password }
      });

      if (response.data?.login) {
        const { token, user } = response.data.login;
        
        // 💾 持久化存储
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('Login successful:', user);
        navigate('/home'); // 登录成功后跳转到首页
        return { success: true };
      }
    } catch (err) {
      console.error('Login failed:', err.message);
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return { performLogin, logout, loading, error };
};