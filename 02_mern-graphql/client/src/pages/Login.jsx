import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
// import LoginForm from '../components/LoginForm';

// 👉 1. 修正 GraphQL 查询，要求返回 token 和 user.id
const LOGIN_MUTATION = gql`
  mutation Login($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      token
      user {
        id
        studentNumber
      }
    }
  }
`;

const App = () => {
  let navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  
  // 建议将 mutation 变量名全大写以区分组件内的函数
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 2. 使用 await 等待请求结果
      const response = await loginMutation({
        variables: {
          studentNumber: studentNumber,
          password: password
        }
      });

      // 3. 登录成功，提取 token 并保存到浏览器的 localStorage 中
      const { token, user } = response.data.login;
      console.log('登录成功！获取到的用户信息:', user);
      
      localStorage.setItem('token', token); // 💾 保存令牌
      
      // 这里可以加上页面跳转的逻辑
      // window.location.href = '/dashboard';

    } catch (err) {
      // 捕获 GraphQL 抛出的错误（例如账号不存在、密码错误等）
      console.error('登录失败:', err.message);
    }
    navigate('/');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h2 className="text-center mb-4">Welcome back</h2>
        
        {/* 如果有错误，在页面上显示出来给用户看 */}
        {error && <div className="alert alert-danger">{error.message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Student Number</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your student number"
              value={studentNumber} // 👉 建议加上 value 绑定，实现受控组件
              onChange={e => setStudentNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password} // 👉 建议加上 value 绑定
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading} // 👉 请求过程中禁用按钮，防止重复提交
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;