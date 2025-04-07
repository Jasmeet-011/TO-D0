// src/pages/LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Link } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
          Sign in to manage your tasks
        </Typography>

        <LoginForm />

        <Typography variant="body2" align="center" mt={3}>
          Don&apos;t have an account?{' '}
          <Link href="/register" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
