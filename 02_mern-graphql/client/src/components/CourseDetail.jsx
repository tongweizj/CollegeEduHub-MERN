import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseDetail = ({ course }) => {
  if (!course || course.length === 0) {
    return <p className="text-center text-muted mt-4">No students found.</p>;
  }

  return (
    <div>
      <Table hover responsive className="shadow-sm border">
        <thead className="table-light">
          <tr>
            <th>Code #</th>
            <th>Name</th>
            <th>section</th>
            <th>semester</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>

          <tr key={course.id} className="align-middle">
            <td>{course.courseCode}</td>
            <td>{`${course.courseName}`}</td>
            <td>{course.section}</td>
            <td>
              <span className="badge bg-info text-dark">{course.semester}</span>
            </td>
            <td className="text-center">

            </td>
          </tr>

        </tbody>
      </Table>

    </div>
  );
};

export default CourseDetail;