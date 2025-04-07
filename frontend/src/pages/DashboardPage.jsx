// src/pages/DashboardPage.jsx
import { useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import { CheckCircleOutline, AccessTime } from '@mui/icons-material';
import TaskCard from '../components/tasks/TaskCard';

const DashboardPage = () => {
  const { tasks, fetchTasks } = useTasks();

  // ✅ Fetch tasks when Dashboard loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <CheckCircleOutline color="success" />
                <Box>
                  <Typography variant="subtitle1">Completed Tasks</Typography>
                  <Typography variant="h5">{completedTasks}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <AccessTime color="warning" />
                <Box>
                  <Typography variant="subtitle1">Pending Tasks</Typography>
                  <Typography variant="h5">{pendingTasks}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Recent Tasks
      </Typography>
      <Grid container spacing={2}>
        {recentTasks.length > 0 ? (
          recentTasks.map((task) => (
            <Grid item xs={12} md={6} lg={4} key={task._id}>
              <TaskCard task={task} />
            </Grid>
          ))
        ) : (
          <Typography color="text.secondary">No recent tasks.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
