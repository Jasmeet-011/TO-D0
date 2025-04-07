import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completed: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTaskData({
        title: initialData.title || '',
        description: initialData.description || '',
        completed: initialData.completed || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckbox = (e) => {
    setTaskData((prev) => ({ ...prev, completed: e.target.checked }));
  };

  const validate = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = 'Title is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(taskData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="h6">
          {initialData ? 'Edit Task' : 'Add New Task'}
        </Typography>

        <TextField
          label="Title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={taskData.completed}
              onChange={handleCheckbox}
              color="primary"
            />
          }
          label="Mark as completed"
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update Task' : 'Add Task'}
          </Button>
          {onCancel && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default TaskForm;
