import taskOp from '../components/taskOp.js';

const renderUserTaskPage = () => {
  const taskId = localStorage.getItem('currentTaskId');
  const username = localStorage.getItem('currentUsername');

  if (!taskId) {
    console.error("No task ID found in localStorage.");
    return;
  }
  if (!username) {
    console.error("No username found in localStorage.");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  console.log('Retrieved tasks:', tasks);
  console.log('Looking for task ID:', taskId);
  console.log('Task ID type:', typeof taskId);
  tasks.forEach(t => console.log('Available task ID:', t.id, 'type:', typeof t.id));

  const task = tasks.find(t => String(t.id) === String(taskId));

  const taskContainer = document.getElementById('userTaskPage');
  if (!taskContainer) {
    console.error("Task container not found");
    return;
  }

  taskContainer.innerHTML = '';

  if (task) {
    taskContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">Task Details</h2>
      <p><strong>Text:</strong> ${task.text}</p>
      <p><strong>Details:</strong> ${task.details || 'No details provided'}</p>
      <p><strong>Due Date:</strong> ${taskOp.formatDate(new Date(task.dueDate))}</p>
      <p><strong>Creation Date:</strong> ${taskOp.formatDate(new Date(task.creationDate))}</p>
      <div id="task-controls"></div>
    `;

    const controlsContainer = document.getElementById('task-controls');
    controlsContainer.appendChild(taskOp.renderTaskControls(task, tasks.indexOf(task)));
  } else {
    console.error(`Task with ID ${taskId} not found for username: ${username}. Tasks available:`, tasks);
    taskContainer.innerHTML = '<p>Task not found.</p>';
  }
};

window.navigateToTaskPage = (username, dateStr, taskId) => {
  console.log("Navigation triggered with:", { username, dateStr, taskId });
  localStorage.setItem('currentTaskId', String(taskId));
  localStorage.setItem('currentUsername', username);
  window.location.href = 'userTaskPage.html';
};

export default renderUserTaskPage;
