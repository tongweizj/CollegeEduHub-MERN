import React from 'react';
import { Table, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCourse } from '../../hooks/useCourseActions';
import StudentCard from '../../components/StudentCard';
import StudentTable from '../../components/StudentTable';
import CourseDetail from '../../components/CourseDetail';
import { useParams, useNavigate } from 'react-router-dom';
const Course = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, error, course } = useCourse(id, navigate);
    console.log("course: ", course)
    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading course...</p>
        </div>
    );

    if (error) return <p className="text-danger text-center">Error loading data!</p>;

    return (
        <div>
        <StudentCard title="Course Detail" maxWidth="1000px">
            
            <CourseDetail course={course}  />
        </StudentCard>

        <StudentCard title="Enrolled Student" maxWidth="1000px">
            
            <StudentTable students={course.students} />
        </StudentCard>
        </div>
    );
}

export default Course;