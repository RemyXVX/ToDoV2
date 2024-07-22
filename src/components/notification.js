import { subscribe } from './../hooks/pubsub.js';

const renderNotifications = (username) => {
  const notificationsContainer = document.getElementById('notifications');
  if (!notificationsContainer) {
    console.error("Notifications container not found");
    return;
  }

  const todos = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  const currentDate = new Date().toISOString().split('T')[0]; 
  const overdueTodos = todos.filter(todo => todo.dueDate < currentDate && !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  notificationsContainer.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Notifications</h2>
    <ul class="space-y-2">
      ${overdueTodos.map(todo => `
        <li class="text-red-500 font-bold">
          Overdue: ${todo.text}
        </li>
      `).join('')}
      ${completedTodos.map(todo => `
        <li class="text-gray-500 line-through">
          Completed: ${todo.text}
        </li>
      `).join('')}
    </ul>
  `;
};

export default renderNotifications;

subscribe('tasksUpdated', () => renderNotifications(username));
