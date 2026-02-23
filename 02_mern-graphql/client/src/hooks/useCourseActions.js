import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_COURSE, GET_COURSE, EDIT_COURSE, GET_COURSES, DELETE_COURSE } from '../graphql/courseQueries';

/**
 * Hook to fetch a single course's details.
 * 获取单个课程详情的 Hook。
 */
export const useCourse = (id, navigate) => {
  // State for storing course details / 存储课程详情的状态
  const [course, setCourse] = useState({
    courseCode: '', courseName: '', section: '', semester: '',
  });

  // Query to get course data by ID / 根据 ID 获取课程数据的查询
  const { loading, error } = useQuery(GET_COURSE, {
    variables: { courseId: id }, // Variable name matches GraphQL definition / 变量名与 GraphQL 定义匹配
    onCompleted: (data) => {
      if (data && data.course) {
        // Remove metadata and ID before setting state / 设置状态前移除元数据和 ID
        const { __typename, id: _, ...rest } = data.course;
        setCourse(rest);
      }
    },
  });

  return {
    loading,
    error,
    course: course
  };
};

/**
 * Hook to manage the list of courses and deletion logic.
 * 管理课程列表及删除逻辑的 Hook。
 */
export const useCourseList = () => {
  // Fetch all courses from the server / 从服务器获取所有课程
  const { loading, error, data, refetch } = useQuery(GET_COURSES);

  // Mutation to delete a specific course / 删除特定课程的变更
  const [deleteCourseMutation] = useMutation(DELETE_COURSE);

  /**
   * Logic to handle course deletion after confirmation.
   * 确认后处理课程删除的逻辑。
   */
  const handleDelete = async (deleteCourseId) => {
    if (window.confirm('Are you sure you want to drop this course?')) {
      try {
        await deleteCourseMutation({ variables: { deleteCourseId } });
        refetch(); // Refresh the list after successful deletion / 删除成功后刷新列表
      } catch (err) {
        console.error('Error deleting course:', err);
        alert('Failed to delete course.');
      }
    }
  };

  return {
    loading,
    error,
    courses: data?.courses || [],
    handleDelete
  };
};

/**
 * Hook to handle the creation of a new course.
 * 处理创建新课程的 Hook。
 */
export const useAddCourse = (navigate) => {
  // Local state for the new course form / 新课程表单的本地状态
  const [course, setCourse] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });

  // Mutation to add a course, refetching list on success / 添加课程的变更，成功后重新获取列表
  const [addMutation, { loading, error }] = useMutation(ADD_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  });

  // Generic input change handler / 通用的输入变化处理函数
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  // Form submission logic / 表单提交逻辑
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMutation({ variables: { ...course } });
      navigate('/course'); // Redirect to course list / 跳转至课程列表
    } catch (err) {
      console.error('Add course failed:', err.message);
    }
  };

  return { course, handleInputChange, handleSubmit, loading, error };
};

/**
 * Hook to handle course data editing and updating.
 * 处理课程数据编辑和更新的 Hook。
 */
export const useEditCourse = (id, navigate) => {
  const [course, setCourse] = useState({
    courseCode: '', courseName: '', section: '', semester: '',
  });

  // Fetch initial data to populate the edit form / 获取初始数据以填充编辑表单
  const { loading, error } = useQuery(GET_COURSE, {
    variables: { courseId: id },
    onCompleted: (data) => {
      if (data && data.course) {
        const { __typename, id: _, ...rest } = data.course;
        setCourse(rest);
      }
    },
  });

  // Mutation to update course data / 更新课程数据的变更
  const [updateCourse] = useMutation(EDIT_COURSE);

  // Sync input changes with local state / 将输入变化同步到本地状态
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  // Logic to save updated course info / 保存更新后的课程信息的逻辑
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCourse({
        variables: {
          updateCourseId: id, // Mapping variables correctly / 正确映射变量
          ...course
        }
      });
      navigate('/course');
    } catch (err) {
      console.error('Update failed:', err.message);
    }
  };

  return { course, loading, error, handleInputChange, handleSubmit };
};