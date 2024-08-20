import taskOp from '../components/taskOp.js';

const renderUserTaskPage = () => {
  const taskId = localStorage.getItem('currentTaskId'); // Assuming taskId is now used to identify the task uniquely
  const username = localStorage.getItem('currentUsername');
  
  const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  const task = tasks.find(t => t.id === taskId);

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
    taskContainer.innerHTML = '<p>Task not found.</p>';
    console.error(`Task with ID ${taskId} not found.`);
  }
};

export default renderUserTaskPage;
