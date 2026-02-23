import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseTable = ({ courses, onDelete, selectedIds = null,
  onSelectionChange = null }) => {
  if (!courses || courses.length === 0) {
    return <p className="text-center text-muted mt-4">No course found.</p>;
  }
  const showActions = onDelete != null;
  const showCheckbox = selectedIds != null && onSelectionChange != null;
  return (
    <Table hover responsive className="shadow-sm border">
      <thead className="table-light">
        <tr>
          <th>Code #</th>
          <th>Name</th>
          <th>section</th>
          <th>semester</th>
          {showCheckbox && <th style={{ width: '40px' }}>Select</th>}
          {showActions && <th className="text-center">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id} className="align-middle">
            <td>{course.courseCode}</td>
            <td>{`${course.courseName}`}</td>
            <td>{course.section}</td>
            <td>
              <span className="badge bg-info text-dark">{course.semester}</span>
            </td>
            {showActions && (<td className="text-center">
              <Button
                as={Link}
                to={`/course/${course.id}`}
                variant="outline-primary"
                size="sm"
                className="me-2"
              >
                view
              </Button>
              <Button
                as={Link}
                to={`/course/edit/${course.id}`}
                variant="outline-primary"
                size="sm"
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(course.id)}
              >
                Delete
              </Button>

            </td>)}

            {showCheckbox && (
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedIds.includes(course.id)}
                  onChange={() => onSelectionChange(course.id)}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CourseTable;