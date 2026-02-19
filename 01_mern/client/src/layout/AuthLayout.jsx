import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './admin.css'
const LoginLayout = ({ children }) => {
    const location = useLocation();
    
    // 导航菜单配置
    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <i className="bi bi-speedometer2"></i> },
        { name: 'Students', path: '/admin/students', icon: <i className="bi bi-people"></i> },
        { name: 'Courses', path: '/admin/courses', icon: <i className="bi bi-journal-text"></i> },
    ];

    // 侧边栏折叠状态
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // 处理退出登录
    const handleLogout = () => {
        if (window.confirm('确定要退出登录吗？')) {
            // 这里可以添加实际的退出逻辑
            console.log('用户退出登录');
        }
    };

    // 切换侧边栏
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // 检查当前路径是否激活
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* 顶部导航栏 */}
            <nav className="navbar navbar-top navbar-expand-lg">
                <div className="container-fluid">
                    {/* 品牌/标题 */}
                    <a className="navbar-brand" href="/">
                        <i className="bi bi-layers-half"></i> Student Enrollment System
                    </a>

                    {/* 右侧导航项 */}
                    <div className="d-flex align-items-center">
                        {/* 移动端菜单切换按钮 */}
                        <button 
                            className="btn btn-link text-white d-lg-none ms-2" 
                            id="sidebarToggle"
                            onClick={toggleSidebar}
                        >
                            <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
                        </button>
                    </div>
                </div>
            </nav>

            
            {/* 主内容区域 */}
            <div 
                
            >
                <Outlet />
                
                {/* 底部信息 */}
                <footer className="pt-3">
                    <div className="text-center text-muted small">
                        <p>© 2026 Student Information System. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default LoginLayout;