// src/utils/helpers.jsx
export const truncate = (str, n) =>
  str?.length > n ? str.slice(0, n - 1) + '...' : str;

export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const sortTasks = (tasks, key = 'createdAt', direction = 'desc') => {
  return [...tasks].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'pending':
      return tasks.filter((task) => !task.completed);
    case 'recent':
      return sortTasks(tasks).slice(0, 5);
    default:
      return tasks;
  }
};
