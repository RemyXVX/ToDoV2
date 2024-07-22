const renderNotifications = (username) => {
  const notificationsContainer = document.getElementById('notifications');
  const todos = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];

  const highPriorityTodos = todos.filter(todo => todo.priority === 'high' && !todo.completed);

  notificationsContainer.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Notifications</h2>
    <ul class="space-y-2">
      ${highPriorityTodos.map(todo => `
        <li class="text-red-500">
          ${todo.text}
        </li>
      `).join('')}
    </ul>
  `;
};

export default renderNotifications;
