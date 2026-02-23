import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useDeleteStudentByEmail } from '../../hooks/useStudentActions';
import StudentCard from '../../components/StudentCard';
import FormInput from '../../components/FormInput';

const DeleteStudent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { performDelete, loading, error } = useDeleteStudentByEmail(navigate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete the student with email: ${email}?`)) {
      performDelete(email);
    }
  };

  return (
    <StudentCard title="Delete Student" maxWidth="500px">
      
      {error && <Alert variant="danger" className="py-2 small">Error: {error.message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FormInput
          label="Student Email Address"
          name="email"
          type="email"
          placeholder="Enter email to delete..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Form.Text className="text-muted d-block mb-4">
          Warning: This action cannot be undone.
        </Form.Text>

        <div className="d-grid gap-2">
          {/* 按钮保留红色 variant="danger" 是合理的，因为它是危险操作 */}
          <Button 
            variant="danger" 
            type="submit" 
            disabled={loading || !email}
          >
            {loading ? <Spinner size="sm" animation="border" /> : 'Confirm Delete'}
          </Button>
          
        </div>
      </Form>
    </StudentCard>
  );
};

export default DeleteStudent;