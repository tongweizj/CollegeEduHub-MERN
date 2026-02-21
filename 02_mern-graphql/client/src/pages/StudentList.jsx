import React from 'react';
import { Table, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStudentList } from '../hooks/useStudentActions';
import StudentCard from '../components/StudentCard';
import StudentTable from '../components/StudentTable';
const StudentList = () => {
    const { loading, error, students, handleDelete, refetch } = useStudentList();
    
    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading students...</p>
        </div>
    );

    if (error) return <p className="text-danger text-center">Error loading data!</p>;

    return (
       <StudentCard title="Student List" maxWidth="1000px">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="link" size="sm" onClick={() => refetch()}>
          Refresh List
        </Button>
      </div>

      {/* 使用我们抽离的表格组件 */}
      <StudentTable students={students} onDelete={handleDelete} />
    </StudentCard>
    );
}

export default StudentList;