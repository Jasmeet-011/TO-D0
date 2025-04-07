// src/components/layout/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext'; // ✅ Import tasks

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
  const { clearTasks } = useTasks(); // ✅ Access clearTasks

  // ✅ Clear tasks before logging out
  const handleLogout = () => {
    clearTasks();
    logout();
  };

  return (
    <AppBar position="fixed" color="default" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          TaskFlow
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
          <Button component={Link} to="/tasks" color="inherit">Task</Button>
          <Button component={Link} to="/profile" color="inherit">Profile</Button>

          <IconButton onClick={toggleTheme} color="inherit">
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {token && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout} // ✅ Use handler
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
