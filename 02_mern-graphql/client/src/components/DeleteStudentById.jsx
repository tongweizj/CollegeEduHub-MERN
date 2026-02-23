import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useDeleteStudentById } from '../hooks/useStudentActions';

const DeleteStudentById = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const { performDelete, loading, error } = useDeleteStudentById(navigate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm(`Critical: Are you sure you want to delete Student ID: ${studentId}?`)) {
      performDelete(studentId);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <Card className="shadow-sm border-danger">
        <Card.Body className="p-4">
          <h2 className="mb-4 text-center text-danger">Delete by ID</h2>

          {error && <Alert variant="danger">Error: {error.message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formStudentId">
              <Form.Label>Student Unique ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Student ID (e.g. 65a...)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Please be careful. Deleting by ID is permanent.
              </Form.Text>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                variant="danger"
                type="submit"
                disabled={loading || !studentId}
              >
                {loading ? <Spinner size="sm" animation="border" /> : 'Confirm Delete'}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/studentlist')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeleteStudentById;