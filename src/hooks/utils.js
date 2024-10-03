export const getTasksForDay = (username, dateStr) => {
  const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  const targetDate = new Date(dateStr);
  targetDate.setHours(0, 0, 0, 0);

  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === targetDate.getTime();
  });
};
