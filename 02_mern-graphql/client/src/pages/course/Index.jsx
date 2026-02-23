import React from 'react';
import { Table, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCourseList } from '../../hooks/useCourseActions';
import StudentCard from '../../components/StudentCard';
import CourseTable from '../../components/CourseTable';
import { useNavigate } from 'react-router-dom';
const Course = () => {
    const navigate = useNavigate();
    const { loading, error, courses, handleDelete } = useCourseList();
    console.log("courses: ", courses)
    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading courses...</p>
        </div>
    );

    if (error) return <p className="text-danger text-center">Error loading data!</p>;

    return (
        <StudentCard title="Course List" maxWidth="1000px">
            <div className="d-flex justify-content-end mb-3">
                <Button variant="link" size="sm" onClick={() => navigate('/course/add')}>
                    Add Course
                </Button>
       
            </div>
            {/* 使用我们抽离的表格组件 */}
            <CourseTable courses={courses} onDelete={handleDelete} />
        </StudentCard>
    );
}

export default Course;