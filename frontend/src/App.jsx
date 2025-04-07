// src/App.jsx
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ToastProvider from './components/ui/ToastProvider';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme/theme';

// Lazy-loaded pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TasksPage = lazy(() => import('./pages/TasksPage'));
const TaskDetailPage = lazy(() => import('./pages/TaskDetailPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// 🔒 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

// 👥 Auth-based Redirect (for `/`)
const AuthRedirect = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

// 📦 Core App Content
const AppContent = () => {
  const { theme } = useTheme();
  const muiTheme = getTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Navbar />
      <div style={{ display: 'flex', paddingTop: 64 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 24 }}>
          <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
            <Routes>
              {/* Default route redirects */}
              <Route path="/" element={<AuthRedirect />} />

              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected app routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/:id"
                element={
                  <ProtectedRoute>
                    <TaskDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* 404 fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </MuiThemeProvider>
  );
};

// 🌐 Wrap everything with Providers
const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
