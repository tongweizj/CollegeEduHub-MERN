import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'; // 引入 Table 组件
import { useNavigate, useParams } from 'react-router-dom';

function EditCourse(props) {
  let { id } = useParams();
  let navigate = useNavigate();

  const [students, setStudents] = useState([]); // 所有学生
  const [selectedIds, setSelectedIds] = useState([]); // 选中的学生ID
  const [course, setCourse] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
    students: []
  });
  const [showLoading, setShowLoading] = useState(true);

  const apiUrl = "/api/api/courses/" + id;
  const apiStudentUrl = "/api/students";

  // 1. 初始化加载数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 同时获取课程和学生列表
        const [courseRes, studentRes] = await Promise.all([
          axios.get(apiUrl),
          axios.get(apiStudentUrl)
        ]);

        // 设置课程基本信息
        setCourse(courseRes.data);
        
        // 核心优化 1：设置默认勾选的学生 ID
        // 注意：这里要确保从 data.students 里提取，且处理可能为 null 的情况
        const rawStudents = courseRes.data.students || [];
        const normalizedIds = rawStudents.map(s => (typeof s === 'object' ? s._id : s));
      
        setSelectedIds(normalizedIds);

        // 设置所有学生列表
        if (studentRes.data.screen !== 'auth') {
          setStudents(studentRes.data);
        }
      } catch (error) {
        console.error("加载失败:", error);
      } finally {
        setShowLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 更新课程逻辑
  const updateCourse = (e) => {
    e.preventDefault();
    setShowLoading(true);
    const uniqueIds = Array.from(new Set(selectedIds));
    const data = {
      ...course,
      students: uniqueIds // 提交最新的勾选数组
    };

    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/admin/course/' + id);
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // 勾选逻辑
  const handleCheckboxChange = (studentId) => {
    setSelectedIds((prev) => 
      prev.includes(studentId)
        ? prev.filter(i => i !== studentId)
        : [...prev, studentId]
    );
  };

  return (
    <div className="container mt-3">
      {showLoading && <Spinner animation="border" role="status" />}
      
      <h2>Edit Course</h2>
      <Form onSubmit={updateCourse}>
        <Form.Group className="mb-3">
          <Form.Label>Course Code *</Form.Label>
          <Form.Control type="text" name="courseCode" value={course.courseCode} onChange={onChange} required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Course Name *</Form.Label>
          <Form.Control type="text" name="courseName" value={course.courseName} onChange={onChange} required />
        </Form.Group>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control type="text" name="section" value={course.section} onChange={onChange} />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control type="text" name="semester" value={course.semester} onChange={onChange} />
            </Form.Group>
          </div>
        </div>

        <hr />
        <h3>Enroll Students</h3>
        
        {/* 核心优化 2：使用更整洁的 Bootstrap Table */}
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '50px' }}>Select</th>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((item) => (
                <tr key={item._id}>
                  <td className="text-center">
                    <Form.Check 
                      type="checkbox"
                      checked={selectedIds.some(selectedId => String(selectedId) === String(item._id))}
  onChange={() => handleCheckboxChange(item._id)}
                    />
                  </td>
                  <td>{item.studentNumber}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No students found</td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="mt-4 mb-5">
          <Button variant="primary" type="submit" size="lg">
            Update Course
          </Button>
          <Button variant="secondary" className="ms-2" size="lg" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditCourse;