// src/pages/ProfilePage.jsx
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import { Email, CalendarToday } from '@mui/icons-material';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
          <Avatar sx={{ width: 64, height: 64 }}>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.username}</Typography>
            <Typography color="text.secondary">Member since</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Email fontSize="small" />
            <Typography>{user?.email}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CalendarToday fontSize="small" />
            <Typography>
              Joined on {new Date(user?.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
