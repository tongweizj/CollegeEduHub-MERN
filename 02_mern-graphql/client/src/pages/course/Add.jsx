import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useAddCourse } from '../../hooks/useCourseActions';
import FormInput from '../../components/FormInput';
const AddCourse = () => {
  const navigate = useNavigate();
  const { course, handleInputChange, handleSubmit, loading, error } = useAddCourse(navigate);

  return (
    <Container className="mt-5" style={{ maxWidth: '700px' }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="mb-4 text-center">Add Course</h2>

          {error && <Alert variant="danger" className="py-2 small">Error: {error.message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <FormInput
                md={6}
                label="Course Code"
                name="courseCode"
                value={course.courseCode}
                onChange={handleInputChange}
                required
              />
            </Row>
            <Row>
              <FormInput
                md={6}
                label="courseName"
                name="courseName"
                type="String"
                value={course.courseName}
                onChange={handleInputChange}
                required
              />
            </Row>
            <Row>
              <FormInput
                md={6}
                label="section"
                name="section"
                type="String"
                value={course.section}
                onChange={handleInputChange}
                required
              />
            </Row>

            <Row>
              <FormInput
                md={6}
                label="semester"
                name="semester"
                type="String"
                value={course.semester}
                onChange={handleInputChange}
                required
              />
            </Row>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Create Course'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddCourse;