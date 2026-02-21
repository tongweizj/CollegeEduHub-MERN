import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useAddStudent } from '../hooks/useStudentActions';

const AddStudent = () => {
  const navigate = useNavigate();
  const { student, handleInputChange, handleSubmit, loading, error } = useAddStudent(navigate);

  return (
    <Container className="mt-5" style={{ maxWidth: '700px' }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="mb-4 text-center">Register New Student</h2>
          
          {error && <Alert variant="danger" className="py-2 small">Error: {error.message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Student Number</Form.Label>
                  <Form.Control 
                    name="studentNumber" 
                    type="text" 
                    value={student.studentNumber} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Password</Form.Label>
                  <Form.Control 
                    name="password" 
                    type="password" 
                    value={student.password} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">First Name</Form.Label>
                  <Form.Control name="firstName" type="text" value={student.firstName} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Last Name</Form.Label>
                  <Form.Control name="lastName" type="text" value={student.lastName} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Email Address</Form.Label>
              <Form.Control name="email" type="email" value={student.email} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Street Address</Form.Label>
              <Form.Control name="address" type="text" value={student.address} onChange={handleInputChange} />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">City</Form.Label>
                  <Form.Control name="city" type="text" value={student.city} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Phone Number</Form.Label>
                  <Form.Control name="phoneNumber" type="text" value={student.phoneNumber} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">Academic Program</Form.Label>
              <Form.Control name="program" type="text" value={student.program} onChange={handleInputChange} />
            </Form.Group>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="secondary" onClick={() => navigate('/login')} className="me-md-2">
                Already registered? Login
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddStudent;