import renderTodoList from "../components/list.js";
import renderCalendar from "../components/calendar.js";
import renderNotifications from "../components/notification.js";

const renderUserPage = (username) => {
  const userPage = document.getElementById('userPage');
  
  userPage.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'bg-white p-6 rounded-lg shadow-lg mx-auto';

  const heading = document.createElement('h1');
  heading.className = 'text-2xl font-bold mb-4';
  heading.textContent = `Welcome ${username}!`;
  container.appendChild(heading);
  
  const gridContainer = document.createElement('div');
  gridContainer.className = 'md:grid md:grid-cols-3 md:gap-4';

  const todoListContainer = document.createElement('div');
  todoListContainer.id = 'todo-list';
  todoListContainer.className = 'col-span-2 bg-gray-100 p-4 rounded';
  gridContainer.appendChild(todoListContainer);
  
  const calendarContainer = document.createElement('div');
  calendarContainer.id = 'calendar';
  calendarContainer.className = 'bg-gray-100 p-4 rounded md:col-span-1';
  gridContainer.appendChild(calendarContainer);
  
  container.appendChild(gridContainer);
  
  const notificationsContainer = document.createElement('div');
  notificationsContainer.id = 'notifications';
  notificationsContainer.className = 'bg-gray-100 p-4 rounded mt-4';
  container.appendChild(notificationsContainer);
  
  userPage.appendChild(container);
  
  renderTodoList(username);
  renderCalendar(username);
  renderNotifications(username);
};

export default renderUserPage;
