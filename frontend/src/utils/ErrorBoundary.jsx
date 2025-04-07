// src/utils/ErrorBoundary.jsx
import { Component } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload(); // or navigate to safe page
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <ErrorOutline color="error" sx={{ fontSize: 60 }} />
            <Typography variant="h4" gutterBottom>
              Something went wrong.
            </Typography>
            <Typography color="text.secondary">
              Please try again or contact support if the issue persists.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={this.handleReset}>
              Try Again
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
