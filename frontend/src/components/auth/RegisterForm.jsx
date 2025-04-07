import { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../Hooks/useToast';

const RegisterForm = () => {
  const { register } = useAuth();
  const showToast = useToast();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await register(formData.username, formData.email, formData.password);
      showToast('Account created successfully!', 'success');
    } catch (error) {
      setErrors({ general: error || 'Registration failed. Please try again.' });
      showToast(error || 'Registration failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {errors.general && <Alert severity="error">{errors.general}</Alert>}

      <TextField
        margin="normal"
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={Boolean(errors.username)}
        helperText={errors.username}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirm ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirm((prev) => !prev)}>
                {showConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={<Checkbox required />}
        label="I agree to the Terms and Privacy Policy"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
      </Button>
    </Box>
  );
};

export default RegisterForm;
