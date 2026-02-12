import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single user
function ShowCourse(props) {
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/courses/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log("result:", result.data)
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    navigate('/admin/course/edit/' + id);
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
      students: course.students
    };

    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        navigate('/admin/courses')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <h1>Course Code: {data.courseCode}</h1>
      <p>Course Name: {data.courseName}</p>
      <p>Section: {data.section}</p>
      <p>Semester: {data.semester}</p>
     <p>students: {data.students?.length||0}</p> 
     
      <p>
        <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Edit</Button>&nbsp;
        <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete</Button>
      </p>
    </div>
  );
}
//
export default ShowCourse;
