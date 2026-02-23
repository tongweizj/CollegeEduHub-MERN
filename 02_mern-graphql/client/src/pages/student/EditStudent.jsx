import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useEditStudent } from '../../hooks/useStudentActions';
import FormInput from '../../components/FormInput';
import StudentCard from '../../components/StudentCard';


const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { student, loading, error, handleInputChange, handleSubmit } = useEditStudent(id, navigate);
  console.log("student:", student)

  if (loading) return (
    <div className="text-center mt-5"><Spinner animation="border" /></div>
  );
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <StudentCard title="Edit Student Information" maxWidth="700px">
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormInput 
            md={6} 
            label="Student Number" 
            name="studentNumber" 
            value={student.studentNumber} 
            onChange={handleInputChange} 
            required 
          />
          <FormInput 
            md={6} 
            label="Password" 
            name="password" 
            type="password" 
            value={student.password} 
            onChange={handleInputChange} 
            required 
          />
        </Row>

        <Row>
          <FormInput 
            md={6} 
            label="First Name" 
            name="firstName" 
            value={student.firstName} 
            onChange={handleInputChange} 
            required 
          />
          <FormInput 
            md={6} 
            label="Last Name" 
            name="lastName" 
            value={student.lastName} 
            onChange={handleInputChange} 
            required 
          />
        </Row>

        <FormInput 
          label="Email Address" 
          name="email" 
          type="email" 
          value={student.email} 
          onChange={handleInputChange} 
          required 
        />

        <FormInput 
          label="Address / College" 
          name="address" 
          value={student.address} 
          onChange={handleInputChange} 
        />

        <Row>
          <FormInput 
            md={6} 
            label="City" 
            name="city" 
            value={student.city} 
            onChange={handleInputChange} 
          />
          <FormInput 
            md={6} 
            label="Phone Number" 
            name="phoneNumber" 
            value={student.phoneNumber} 
            onChange={handleInputChange} 
          />
        </Row>

        <FormInput 
          label="Program" 
          name="program" 
          value={student.program} 
          onChange={handleInputChange} 
        />

        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
          
          <Button variant="primary" type="submit">
            Save
          </Button>

          <Button variant="secondary" className="me-md-2" onClick={() => navigate('/studentlist')}>
            Cancel
          </Button>
        </div>
      </Form>
    </StudentCard>
  );
};

export default EditStudent;