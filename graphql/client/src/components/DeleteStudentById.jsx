import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './entryform.css';

// A delete mutation to delete a student given an email
const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id) { 
      id
      firstName
      lastName 
    }
  }
`;

function DeleteStudentById(props) {
  let navigate = useNavigate();
  let studentId;
  const [deleteStudent, { loading, error }] = useMutation(DELETE_STUDENT);

  if (loading) return <Spinner animation="border" />;
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <h2>Delete Operation</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteStudent({ variables: { studentId: studentId.value } });
          studentEmail.value = '';
          navigate('/studentlist');
        }}
      >
        <Form.Group>
          <Form.Label>Student Id:</Form.Label>
          <Form.Control
            type="text"
            name="id"
            ref={(node) => {
              studentId = node;
            }}
            placeholder="Student ID"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Delete Student
        </Button>
      </form>
    </div>
  );
}

export default DeleteStudentById;
