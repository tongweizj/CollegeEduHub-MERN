// LoginForm.jsx
import React , { useState, useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
// 如果你已经引入了 react-bootstrap，建议统一使用，但这里我保留了你的原生 class 混用
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ title, apiUrl, redirectPath, isAdmin }) => {
    let navigate = useNavigate();
    const { authname, loading } = useAuth();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 将验证逻辑封装在 handleSubmit 中
    const handleSubmit = async (e) => {
        // 1. 必须阻止默认行为，防止页面刷新
        e.preventDefault(); 
        
        console.log(`尝试登录到: ${apiUrl}`);
        const loginData = { auth: { username, password } };

        try {
            const res = await axios.post(apiUrl, loginData, { withCredentials: true });
            
            // 2. 檢查返回數據
            if (res.data.screen !== undefined && res.data.screen !== 'auth' && res.data.status !== 'error') {
                console.log('登录成功，准备跳转...');
                // 3. 使用 navigate 跳转
                navigate(redirectPath);
            } else {
                alert("Invalid credentials. Please check your username and password.");
            }
        } catch (e) {
            console.error('Login error:', e);
            alert("Login failed. Please verify your credentials.");
        }
    };

    const readCookie = async () => {
        try {
            const res = await axios.get('/api/read_cookie', { withCredentials: true });
            if (res.data.screen !== undefined && res.data.screen !== 'auth') {
                // 如果已登录，跳转到主页或指定路径
                navigate('/');
            }
        } catch (e) {
            console.log("未检测到有效会话");
        }
    };

    useEffect(() => {
        readCookie();
    }, []);

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <h2 className="text-center mb-4">{title}</h2>
                {/* 绑定 onSubmit 到 form 上，这样回车键也能触发登录 */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username"
                            placeholder="Enter your username" 
                            onChange={e => setUsername(e.target.value)}
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
                            onChange={e => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        {/* 按钮保持 type="submit" */}
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>

                        {!isAdmin ? (
                            <a href="/auth/admin/login" className="btn btn-outline-secondary">Admin Login</a>
                        ) : (
                            <a href="/auth/login" className="btn btn-outline-secondary">User Login</a>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;