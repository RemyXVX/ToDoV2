import { subscribe } from '../../hooks/pubsub.js';
import taskOp from '../../components/taskOp.js';

const renderArchive = (username) => {
  const archiveContainer = document.getElementById('archivePage');
  if (!archiveContainer) {
    console.error("Archive container not found");
    return;
  }

  const archivedTodos = JSON.parse(localStorage.getItem(`${username}-archivedTodos`)) || [];

  archiveContainer.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-indigo-600 mb-6">Archived Tasks</h2>
      <ul class="space-y-4">
        ${archivedTodos.map((todo, index) => `
          <li class="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div class="flex justify-between items-center">
              <div>
                <div class="${todo.completed ? 'text-gray-500 line-through' : 'text-black'} font-semibold text-lg">
                  ${todo.text}
                </div>
                <div class="text-sm text-gray-400 mt-1">
                  <span class="mr-2"><strong>Created:</strong> ${todo.creationDate}</span>
                  <span class="mr-2"><strong>Due:</strong> ${todo.dueDate || 'Not set'}</span>
                  <span><strong>Archived:</strong> ${todo.archivedDate}</span>
                </div>
              </div>
              <button class="unarchive-button px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out" data-index="${index}">Unarchive</button>
            </div>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  archiveContainer.querySelectorAll('.unarchive-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      taskOp.unarchiveTask(index);
      renderArchive(username);
    });
  });
};

subscribe('tasksUpdated', (data) => {
  if (data.username) {
    renderArchive(data.username);
  }
});

export default renderArchive;
