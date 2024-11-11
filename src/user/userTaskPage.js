import taskOp from '../components/taskOp.js';
import renderUserPage from './userPage.js';
import navigateTo from '../hooks/route.js';

const renderUserTaskPage = () => {
  const taskId = localStorage.getItem('currentTaskId');
  const username = localStorage.getItem('currentUsername');

  if (!taskId || !username) {
    console.error("Missing required data:", { taskId, username });
    return renderErrorState("Missing required task information");
  }

  // Load tasks from localStorage and set in taskOp
  const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  taskOp.todos = tasks;

  // Find the specific task to display
  const task = taskOp.todos.find(t => String(t.id) === String(taskId));
  const taskContainer = document.getElementById('userTaskPage');

  if (!taskContainer) {
    console.error("Task container not found");
    return;
  }

  taskContainer.innerHTML = '';

  if (task) {
    renderTaskDetails(taskContainer, task, username);
  } else {
    console.error(`Task with ID ${taskId} not found for username: ${username}`);
    renderErrorState("Task not found", taskContainer);
  }
};

const renderTaskDetails = (container, task, username) => {
  container.className = 'min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8';

  container.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <div class="mb-6">
        <button
          id="backToUserPageButton"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to User Page
        </button>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h2 class="text-2xl font-bold text-gray-900">Task Details</h2>
        </div>

        <div class="px-6 py-5">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Task</dt>
              <dd class="mt-1 text-lg text-gray-900">${task.text}</dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Details</dt>
              <dd class="mt-1 text-gray-900 whitespace-pre-wrap">${task.details || 'No details provided'}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Due Date</dt>
              <dd class="mt-1 text-gray-900">${taskOp.formatDate(new Date(task.dueDate))}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Created On</dt>
              <dd class="mt-1 text-gray-900">${taskOp.formatDate(new Date(task.creationDate))}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  `;

  // Attach event listener to the "Back to User Page" button
  const backToUserPageButton = document.getElementById('backToUserPageButton');
  if (backToUserPageButton) {
    backToUserPageButton.addEventListener('click', () => {
      navigateTo('userPage');
      renderUserPage(username);
    });
  } else {
    console.error("Back to User Page button not found");
  }
};

export default renderUserTaskPage;