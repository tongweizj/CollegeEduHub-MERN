import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Spinner, Card, Container } from 'react-bootstrap';
import { useEditStudent } from '../../hooks/useStudentActions';
import StudentCard from '../../components/StudentCard';
import CourseTable from '../../components/CourseTable';

const Student = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { student, loading, error } = useEditStudent(id, navigate);

  if (loading) return (
    <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>
  );
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  // 内部辅助组件：格式化显示一行信息
  const InfoRow = ({ label, value }) => (
    <div className="mb-3">
      <div className="text-secondary small">{label}</div>
      <div className="fw-bold" style={{ fontSize: '1.1rem' }}>{value || 'N/A'}</div>
    </div>
  );

  return (
    <Container className="py-4">
      {/* 第一部分：学生基本信息 */}
      <StudentCard title="Student Profile" maxWidth="800px">
        <Row className="text-start">
          <Col md={6}>
            <InfoRow label="Student Number" value={student.studentNumber} />
            <InfoRow label="Full Name" value={`${student.firstName} ${student.lastName}`} />
            <InfoRow label="Email Address" value={student.email} />
          </Col>
          <Col md={6}>
            <InfoRow label="Program" value={student.program} />
            <InfoRow label="Phone Number" value={student.phoneNumber} />
            <InfoRow label="City" value={student.city} />
          </Col>
          <Col xs={12}>
            <InfoRow label="Home Address" value={student.address} />
          </Col>
        </Row>
        
        <div className="d-flex justify-content-start mt-3">
           <Button variant="outline-primary" size="sm" onClick={() => navigate(`/editstudent/${id}`)}>
             Edit Profile
           </Button>
        </div>
      </StudentCard>

      {/* 第二部分：已选课程列表 */}
      <div className="mt-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0 text-start" style={{ fontWeight: '600' }}>Enrolled Courses</h4>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate(`/enrollcourses/${id}`)}
              >
                + Update Enrollment
              </Button>
            </div>

            {/* 复用 CourseTable，不传 onDelete 则不显示操作列 */}
            <CourseTable courses={student.enrolledCourse} />
            
            {(!student.enrolledCourse || student.enrolledCourse.length === 0) && (
              <div className="text-center text-muted py-4 bg-light rounded mt-2">
                This student has not enrolled in any courses yet.
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      <div className="mt-4 text-center">
        <Button variant="link" className="text-secondary" onClick={() => navigate('/studentlist')}>
          ← Back to Student List
        </Button>
      </div>
    </Container>
  );
};

export default Student;