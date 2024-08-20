export const getTasksForDay = (username, dateStr) => {
  const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  return tasks.filter(task => new Date(task.dueDate).toDateString() === new Date(dateStr).toDateString());
};
