import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  GET_STUDENT, GET_STUDENTS, DELETE_STUDENT_EMAIL, 
  DELETE_STUDENT_ID, UPDATE_STUDENT, ADD_STUDENT, 
  ENROLL_STUDENT_IN_COURSES 
} from '../graphql/studentQueries';
import { GET_COURSES } from '../graphql/courseQueries';

/**
 * Hook to manage student data editing.
 * 用于管理学生数据编辑的 Hook。
 */
export const useEditStudent = (id, navigate) => {
  const [student, setStudent] = useState({
    studentNumber: '', password: '', firstName: '', lastName: '',
    address: '', city: '', phoneNumber: '', email: '', program: ''
  });

  // 1. Fetch initial student data by ID / 通过 ID 获取初始学生数据
  const { loading, error } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      if (data && data.student) {
        // Exclude __typename and id from the form state / 从表单状态中排除元数据和 ID
        const { __typename, id: _, ...rest } = data.student;
        setStudent(rest);
      }
    },
  });

  // 2. Mutation for updating student details / 用于更新学生详情的变更
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  // 3. Handle form input changes / 处理表单输入变化
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  // 4. Handle form submission / 处理表单提交逻辑
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateStudent({
        variables: { id, ...student }
      });
      navigate('/studentlist'); // Redirect to list after success / 成功后跳转回列表
    } catch (err) {
      console.error('Update failed:', err.message);
    }
  };

  return { student, loading, error, handleInputChange, handleSubmit };
};

/**
 * Hook to fetch student list and handle inline deletion.
 * 用于获取学生列表并处理行内删除的 Hook。
 */
export const useStudentList = () => {
  // 1. Fetch all students / 获取所有学生数据
  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

  // 2. Mutation for deleting student by ID / 通过 ID 删除学生的变更
  const [deleteStudentMutation] = useMutation(DELETE_STUDENT_ID);

  // 3. Deletion logic with confirmation / 带有确认提示的删除逻辑
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudentMutation({ variables: { id } });
        refetch(); // Refresh list to show updated data / 刷新列表以显示更新后的数据
      } catch (err) {
        console.error('Error deleting student:', err);
        alert('Failed to delete student.');
      }
    }
  };

  return { loading, error, students: data?.students || [], handleDelete, refetch };
};

/**
 * Hook to delete a student using their email address.
 * 通过电子邮件删除学生的 Hook。
 */
export const useDeleteStudentByEmail = (navigate) => {
  const [deleteMutation, { loading, error }] = useMutation(DELETE_STUDENT_EMAIL, {
    // Automatically refresh the student list query / 自动刷新学生列表查询
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

/**
 * Hook to delete a student using their ID.
 * 通过 ID 删除学生的 Hook。
 */
export const useDeleteStudentById = (navigate) => {
  const [deleteMutation, { loading, error }] = useMutation(DELETE_STUDENT_ID, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const performDelete = async (id) => {
    try {
      await deleteMutation({ variables: { id } });
      navigate('/studentlist');
    } catch (err) {
      console.error("Delete by ID failed:", err.message);
    }
  };

  return { performDelete, loading, error };
};

/**
 * Hook to handle new student registration.
 * 用于处理新学生注册的 Hook。
 */
export const useAddStudent = (navigate) => {
  const [student, setStudent] = useState({
    studentNumber: '', password: '', firstName: '', lastName: '',
    address: '', city: '', phoneNumber: '', email: '', program: ''
  });

  const [addMutation, { loading, error }] = useMutation(ADD_STUDENT, {
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

/**
 * Hook for real-time course enrollment management.
 * 用于实时选课管理的 Hook。
 */
export const useEnrollCourses = (studentId, navigate) => {
  // Local state for currently selected course IDs / 当前选定课程 ID 的本地状态
  const [selectedIds, setSelectedIds] = useState([]);

  // 1. Fetch available courses for selection / 获取可供选择的所有课程
  const { loading, error, data } = useQuery(GET_COURSES);

  // 2. Fetch current student's enrollment data / 获取当前学生的选课数据
  const { loading: studentLoading } = useQuery(GET_STUDENT, {
    variables: { id: studentId },
    fetchPolicy: 'network-only', // Ensure fresh data from server / 确保从服务器获取最新数据
    onCompleted: (data) => {
      if (data?.student?.enrolledCourse) {
        // Initialize checkboxes with current enrollments / 使用当前的选课记录初始化复选框
        const initialCourseIds = data.student.enrolledCourse.map(c => c.id);
        setSelectedIds(initialCourseIds);
      }
    },
  });

  // 3. Mutation for syncing enrollment changes / 用于同步选课变更的变更
  const [enrollAction, { loading: mutationLoading }] = useMutation(ENROLL_STUDENT_IN_COURSES);

  /**
   * Handles individual checkbox toggles and auto-syncs with the server.
   * 处理单个复选框的切换并自动与服务器同步。
   */
  const handleCheckboxChange = async (courseId) => {
    // Calculate the latest selection list / 计算最新的选中列表
    const isRemoving = selectedIds.includes(courseId);
    const updatedIds = isRemoving
      ? selectedIds.filter(id => id !== courseId)
      : [...selectedIds, courseId];

    // Update UI state immediately for responsiveness / 立即更新 UI 状态以保证响应速度
    setSelectedIds(updatedIds);

    // Sync the entire updated list to the server / 将完整的更新列表同步到服务器
    try {
      await enrollAction({
        variables: {
          studentId: studentId,
          courseIds: updatedIds 
        }
      });
      console.log("Auto-sync successful");
    } catch (err) {
      console.error('Auto-sync failed:', err.message);
      // Rollback UI state on failure / 失败时回滚 UI 状态
      setSelectedIds(selectedIds); 
    }
  };

  return {
    courses: data?.courses || [],
    selectedIds,
    loading: loading || studentLoading || mutationLoading,
    error,
    handleCheckboxChange
  };
};