import renderTodoList from "../components/list.js";
import renderCalendar from "../components/calendar.js";
import renderNotifications from "../components/notification.js";

const renderUserPage = (username) => {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-lg mx-auto">
      <h1 class="text-2xl font-bold mb-4">Welcome ${username}!</h1>
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div id="todo-list" class="col-span-2 bg-gray-100 p-4 rounded"></div>
        <div id="calendar" class="bg-gray-100 p-4 rounded md:col-span-1"></div>
      </div>
      <div id="notifications" class="bg-gray-100 p-4 rounded mt-4"></div>
    </div>
  `;

  renderTodoList(username);
  renderCalendar(username);
  renderNotifications(username);
};

export default renderUserPage;
