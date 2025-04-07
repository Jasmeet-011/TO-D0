// src/pages/TasksPage.jsx
import { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';
import {
  Box,
  Typography,
  Container,
  Button,
  Collapse,
  Divider,
} from '@mui/material';
import { Add, Cancel } from '@mui/icons-material';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import LoadingSpinner from '../components/ui/LoadingSpinner'; // ✅ Import Spinner

const TasksPage = () => {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    updateTask,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    await addTask(taskData);
    setShowForm(false);
  };

  const handleEditTask = async (updatedTask) => {
    await updateTask(updatedTask._id, updatedTask);
  };

  // ✅ Show loading spinner if loading
  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Tasks</Typography>
        <Button
          variant={showForm ? 'outlined' : 'contained'}
          startIcon={showForm ? <Cancel /> : <Add />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Task'}
        </Button>
      </Box>

      <Collapse in={showForm}>
        <Box mb={3}>
          <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
        </Box>
      </Collapse>

      <Divider sx={{ mb: 3 }} />

      <TaskList
        tasks={tasks}
        error={error}
        onDelete={deleteTask}
        onToggle={toggleTaskCompletion}
        onEdit={handleEditTask}
      />
    </Container>
  );
};

export default TasksPage;
