
// EditStudent component is used to edit a student record. 
// It uses the useQuery and useMutation hooks from Apollo Client 
// to fetch the student record and update the student record respectively. 
// The component uses the useParams and useNavigate hooks from 
// react-router-dom to get the id parameter from the URL and navigate
// to the student list page after updating the student record.
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Queries and Mutations
const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
       id
        studentNumber
        password
        firstName
        lastName
        address
        email
        city
        phoneNumber
        program
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: ID!, 
    $studentNumber: String!,
    $password: String!,
    $firstName: String!, 
    $lastName: String!,
    $address: String!,
    $city: String!,
    $phoneNumber: String!, 
    $email: String!, 
    $program: String!) {
    updateStudent(
      id: $id, 
      studentNumber: $studentNumber,
      password:$password,
      firstName: $firstName, 
      lastName: $lastName,
      address: $address,
      city: $city,
      phoneNumber: $phoneNumber, 
      email: $email, 
      program: $program) {
      id
      studentNumber
      password
      firstName
      lastName
      address
      email
      phoneNumber
      city
      program
    }
  }
`;

const EditStudent = () => {
  let navigate = useNavigate();
  const { id } = useParams(); // Get the `id` parameter from the URL
  console.log('Editing Student ID:', id);

  // Fetch the student data
  const { loading, error, data } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      const { student } = data;
      setStudent({ ...student });
    },
  });

  // Define the mutation for updating the student
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  // State for student data
  const [student, setStudent] = useState({
    studentNumber:'',
    password:'',
    firstName: '',
    lastName: '',
    address:'',
    city:'',
    phoneNumber:'',
    email: '',
    program: ''
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Updating Student:', student);

    try {
      await updateStudent({
        variables: { id, ...student },
      });
      navigate('/studentlist');
    } catch (mutationError) {
      console.error('Error updating student:', mutationError.message);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formStudentNumber">
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type="text"
            name="studentNumber"
            placeholder="Enter Student Number"
            value={student.studentNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="Enter password"
            value={student.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={student.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={student.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>College</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            value={student.address}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>city</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter city"
            value={student.city}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>phoneNumber</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            placeholder="Enter phone Number"
            value={student.phoneNumber}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            value={student.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        

        <Form.Group controlId="formProgram">
          <Form.Label>Program</Form.Label>
          <Form.Control
            type="text"
            name="program"
            placeholder="Enter program"
            value={student.program}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditStudent;
