import { Grid, Typography, Box } from '@mui/material';
import TaskCard from './TaskCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const TaskList = ({ tasks, loading, onDelete, onToggle, onEdit }) => {
  if (loading) return <LoadingSpinner message="Loading tasks..." />;

  return (
    <Grid container spacing={3}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <TaskCard
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          </Grid>
        ))
      ) : (
        <Box textAlign="center" width="100%" py={6}>
          <Typography variant="h6" color="text.secondary">
            No tasks yet. Get started by creating a new task.
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default TaskList;
