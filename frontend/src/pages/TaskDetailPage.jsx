// src/pages/TaskDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import TaskForm from '../components/tasks/TaskForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = tasks.find((t) => t._id === id);
    setTask(found || null);
    setLoading(false);
  }, [id, tasks]);

  const handleUpdate = async (updatedTask) => {
    await updateTask(id, updatedTask);
    navigate('/tasks');
  };

  if (loading) return <LoadingSpinner />;

  if (!task) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" mb={2}>Task not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/tasks')}>
          Back to Tasks
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/tasks')}
        sx={{ mb: 3 }}
      >
        Back to Tasks
      </Button>

      <Typography variant="h4" gutterBottom>
        Task Details
      </Typography>

      <TaskForm initialData={task} onSubmit={handleUpdate} />
    </Container>
  );
};

export default TaskDetailPage;
