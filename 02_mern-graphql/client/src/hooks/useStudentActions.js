import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_STUDENT, GET_STUDENTS, DELETE_STUDENT_EMAIL, DELETE_STUDENT_ID,  UPDATE_STUDENT, ADD_STUDENT } from '../graphql/studentQueries';

export const useEditStudent = (id, navigate) => {
  const [student, setStudent] = useState({
    studentNumber: '', password: '', firstName: '', lastName: '',
    address: '', city: '', phoneNumber: '', email: '', program: ''
  });

  // 1. 获取初始数据
  const { loading, error } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      if (data && data.student) {
        const { __typename, id: _, ...rest } = data.student;
        setStudent(rest);
      }
    },
  });

  // 2. 更新 Mutation
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  // 3. 处理输入变化
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  // 4. 提交表单逻辑
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateStudent({ 
        variables: { id, ...student } 
      });
      navigate('/studentlist');
    } catch (err) {
      console.error('Update failed:', err.message);
    }
  };

  return { 
    student, 
    loading, 
    error, 
    handleInputChange, 
    handleSubmit 
  };
};

export const useStudentList = () => {
  // 1. 获取学生列表数据
  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);
  
  // 2. 删除学生的 Mutation
  const [deleteStudentMutation] = useMutation(DELETE_STUDENT_ID);

  // 3. 删除处理逻辑
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudentMutation({ variables: { id } });
        refetch(); // 删除后刷新列表
      } catch (err) {
        console.error('Error deleting student:', err);
        alert('Failed to delete student.');
      }
    }
  };

  return {
    loading,
    error,
    students: data?.students || [],
    handleDelete,
    refetch
  };
};

export const useDeleteStudentByEmail = (navigate) => {
  const [deleteMutation, { loading, error }] = useMutation(DELETE_STUDENT_EMAIL, {
    // 删除后自动更新缓存中的学生列表，或者直接 refetch
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const performDelete = async (email) => {
    try {
      await deleteMutation({ variables: { email: email } });
      navigate('/studentlist');
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return { performDelete, loading, error };
};

export const useDeleteStudentById = (navigate) => {
  const [deleteMutation, { loading, error }] = useMutation(DELETE_STUDENT_ID, {
    // 成功后自动刷新学生列表缓存
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const performDelete = async (id) => {
    try {
      await deleteMutation({ variables: { id } }); // 确保变量名与 GraphQL 定义一致
      navigate('/studentlist');
    } catch (err) {
      console.error("Delete by ID failed:", err.message);
    }
  };

  return { performDelete, loading, error };
};

export const useAddStudent = (navigate) => {
  const [student, setStudent] = useState({
    studentNumber: '', password: '', firstName: '', lastName: '',
    address: '', city: '', phoneNumber: '', email: '', program: ''
  });

  const [addMutation, { loading, error }] = useMutation(ADD_STUDENT, {
    // 注册成功后，刷新列表缓存，这样跳转过去时能看到最新数据
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMutation({ variables: { ...student } });
      navigate('/studentlist');
    } catch (err) {
      console.error('Registration failed:', err.message);
    }
  };

  return { student, handleInputChange, handleSubmit, loading, error };
};