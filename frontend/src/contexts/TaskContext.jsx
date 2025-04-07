// src/contexts/TaskContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
      setError(null);
      console.log('Fetched tasks for user:', user?._id);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?._id) {
      fetchTasks();
    }
  }, [token, user]);

  // ✅ Clear tasks when user logs out or switches
  useEffect(() => {
    if (!token || !user?._id) {
      setTasks([]);
    }
  }, [token, user]);

  const clearTasks = () => {
    setTasks([]);
  };

  const addTask = async (data) => {
    const response = await api.post('/tasks', data);
    setTasks((prev) => [...prev, response.data]);
    return response.data;
  };

  const updateTask = async (id, updates) => {
    const response = await api.put(`/tasks/${id}`, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? response.data : t)));
    return response.data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    return await updateTask(id, { completed: !task.completed });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        clearTasks, // ✅ expose clearTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
