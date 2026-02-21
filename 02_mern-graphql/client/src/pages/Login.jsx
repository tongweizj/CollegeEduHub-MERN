import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
// 导入自定义组件
import StudentCard from '../components/StudentCard';
import FormInput from '../components/FormInput';

const Login = () => {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const { performLogin, loading, error } = useAuth(navigate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await performLogin(studentNumber, password);
  };

  return (
    <StudentCard title="Welcome Back" maxWidth="400px">
      
      {error && <Alert variant="danger" className="py-2 small">{error.message}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        {/* 使用统一的输入组件 */}
        <FormInput
          label="Student Number"
          name="studentNumber"
          placeholder="Enter student number"
          value={studentNumber}
          onChange={e => setStudentNumber(e.target.value)}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <div className="d-grid mt-4">
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </div>
      </Form>

      <div className="mt-4 text-center">
        <small className="text-muted">
          Don't have an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
        </small>
      </div>
    </StudentCard>
  );
}

export default Login;