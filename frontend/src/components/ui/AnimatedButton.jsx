// src/components/ui/AnimatedButton.jsx
import { Button } from '@mui/material';

const AnimatedButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  ...props
}) => {
  return (
    <Button variant={variant} color={color} size={size} {...props}>
      {children}
    </Button>
  );
};

export default AnimatedButton;
