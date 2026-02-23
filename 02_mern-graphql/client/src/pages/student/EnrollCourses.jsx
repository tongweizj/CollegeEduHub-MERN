import React from 'react';
import { Table, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEnrollCourses } from '../../hooks/useStudentActions';
import StudentCard from '../../components/StudentCard';
import StudentTable from '../../components/StudentTable';
import { useParams, useNavigate } from 'react-router-dom';
import CourseTable from '../../components/CourseTable';
const EnrollCourses = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { courses, selectedIds, loading, error, handleCheckboxChange } = useEnrollCourses(id, navigate)
    console.log('courses:', courses, selectedIds)
    return (
        <StudentCard title="Course List" maxWidth="1000px">
            <div className="d-flex justify-content-end mb-3">
                <Button variant="link" size="sm" onClick={() => navigate(`/student/${id}`)}>
                    back Student detail
                </Button>

            </div>
            <CourseTable courses={courses} selectedIds={selectedIds} onSelectionChange={handleCheckboxChange} />
        </StudentCard>
    );
}

export default EnrollCourses;