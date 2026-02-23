import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useEditCourse } from '../../hooks/useCourseActions';
import FormInput from '../../components/FormInput';
import StudentCard from '../../components/StudentCard';


const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { course, loading, error, handleInputChange, handleSubmit } = useEditCourse(id, navigate);
  

  if (loading) return (
    <div className="text-center mt-5"><Spinner animation="border" /></div>
  );
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <StudentCard title="Edit Course Information" maxWidth="700px">
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

        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
          
          <Button variant="primary" type="submit">
            Save
          </Button>

          <Button variant="secondary" className="me-md-2" onClick={() => navigate('/courses')}>
            Cancel
          </Button>
        </div>
      </Form>
    </StudentCard>
  );
};

export default EditCourse;