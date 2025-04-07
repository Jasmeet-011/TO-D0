import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
    { text: 'New Task', icon: <AssignmentIcon />, path: '/tasks' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={!collapsed}
      sx={{
        width: collapsed ? 60 : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 60 : drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', p: 1 }}>
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            button
            key={text}
            component={NavLink}
            to={path}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: 2.5,
              '&.active': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>
              {icon}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={text} />}
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        {!collapsed && (
          <>
            <Typography variant="body2" color="textSecondary">
              Logged in as
            </Typography>
            {user ? (
              <>
                <Typography variant="body2">{user.username}</Typography>
                <Typography variant="body2">{user.email}</Typography>
              </>
            ) : (
              <Typography variant="body2" color="error">
                Loading user...
              </Typography>
            )}
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
