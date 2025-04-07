// src/utils/validators.jsx
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

export const validateTask = (task) => {
  const errors = {};
  if (!task.title.trim()) errors.title = 'Title is required';
  if (task.title.length > 100) errors.title = 'Title too long (max 100 chars)';
  if (task.description.length > 500)
    errors.description = 'Description too long (max 500 chars)';
  return errors;
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
