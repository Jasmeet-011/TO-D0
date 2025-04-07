// src/components/ui/ToastProvider.jsx
import { SnackbarProvider } from 'notistack';

const ToastProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={4000}
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToastProvider;
