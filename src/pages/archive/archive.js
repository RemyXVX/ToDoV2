import { subscribe } from '../../hooks/pubsub.js';

const renderArchive = (username) => {
  const archiveContainer = document.getElementById('archive');
  if (!archiveContainer) {
    console.error("Archive container not found");
    return;
  }

  const archivedTodos = JSON.parse(localStorage.getItem(`${username}-archivedTodos`)) || [];

  archiveContainer.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Archived Tasks</h2>
    <ul class="space-y-2">
      ${archivedTodos.map(todo => `
        <li class="${todo.completed ? 'text-gray-500 line-through' : 'text-black'}">
          ${todo.text} (Created: ${todo.creationDate}, Due: ${todo.dueDate || 'Not set'}, Completed: ${todo.completed ? 'Yes' : 'No'})
        </li>
      `).join('')}
    </ul>
  `;
};

subscribe('tasksUpdated', (data) => {
  if (data.username) {
    renderArchive(data.username);
  }
});

export default renderArchive;
