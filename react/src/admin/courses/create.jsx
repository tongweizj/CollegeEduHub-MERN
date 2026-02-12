import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//
// import './login.css'
// this component is used to create a new user
function CreateCourse(props) {
  let navigate = useNavigate()
  //
  const [course, setCourse] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '', 
    students: []
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/api/api/courses";

  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
      students: course.students
    };
    //use promises
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/admin/course/' + result.data.courseCode)
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Form onSubmit={saveCourse}>
        <Form.Group>
          <Form.Label> courseCode *</Form.Label>
          <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course Code" value={course.courseCode} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>courseName *</Form.Label>
          <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter course Name" value={course.courseName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Section</Form.Label>
          <Form.Control type="text" name="section" id="section" placeholder="Enter section" value={course.section} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> semester</Form.Label>
          <Form.Control type="text" name="semester" id="semester" placeholder="Enter semester" value={course.semester} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>students</Form.Label>
          <Form.Control type="text" name="students" id="students" rows="3" placeholder="Enter students" value={course.students} onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>

      </Form>
    </div>
  );
}
//
export default CreateCourse;
