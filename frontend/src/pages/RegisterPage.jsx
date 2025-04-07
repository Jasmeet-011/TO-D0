// src/pages/RegisterPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Link } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
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
          Create Account
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
          Get started with your task management
        </Typography>

        <RegisterForm />

        <Typography variant="body2" align="center" mt={3}>
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
