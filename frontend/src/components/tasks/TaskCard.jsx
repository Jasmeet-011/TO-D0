import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  Delete,
  Edit,
  Autorenew,
} from '@mui/icons-material';
import { useState } from 'react';

const TaskCard = ({ task, onDelete, onToggle, onEdit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(task._id);
    setIsLoading(false);
  };

  const handleToggle = async () => {
    setIsLoading(true);
    await onToggle(task._id);
    setIsLoading(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderLeft: `4px solid ${task.completed ? '#4caf50' : '#2196f3'}`,
        backgroundColor: task.completed ? '#f0fdf4' : '#fff',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box flex={1}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
              }}
            >
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {task.description}
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton onClick={handleToggle} disabled={isLoading}>
              {isLoading ? <Autorenew className="spin" /> : <CheckCircle color="success" />}
            </IconButton>
            <IconButton onClick={() => onEdit(task)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} color="error" disabled={isLoading}>
              {isLoading ? <Autorenew className="spin" /> : <Delete />}
            </IconButton>
          </Stack>
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="caption">
            {new Date(task.createdAt).toLocaleDateString()}
          </Typography>
          {task.completed && <Chip label="Completed" color="success" size="small" />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
