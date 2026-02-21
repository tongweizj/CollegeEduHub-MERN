import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentTable = ({ students, onDelete }) => {
  if (!students || students.length === 0) {
    return <p className="text-center text-muted mt-4">No students found.</p>;
  }

  return (
    <Table hover responsive className="shadow-sm border">
      <thead className="table-light">
        <tr>
          <th>Student #</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Program</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="align-middle">
            <td>{student.studentNumber}</td>
            <td>{`${student.firstName} ${student.lastName}`}</td>
            <td>{student.email}</td>
            <td>
              <span className="badge bg-info text-dark">{student.program}</span>
            </td>
            <td className="text-center">
              <Button 
                as={Link} 
                to={`/editstudent/${student.id}`} 
                variant="outline-primary" 
                size="sm" 
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(student.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentTable;