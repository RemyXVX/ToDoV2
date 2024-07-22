import renderTodoList from "../components/list.js";
import renderCalender from "../components/calender.js";
import renderNotifications from "../components/notification.js";

const renderUserPage = (username) => {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <div class="bg-white p-6 rounde-lg shadow-lg max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Welcome ${username}!</h1>
      <div class="grid grid-cols-3 gap-4">
        <div id="todo-list" class="col-span-2 bg-grey-100 p-4 roundered"></div>
        <div id="calender" class="bg-grey-100 p-4 rounded"></div>
      </div>
      <div id="notifications" class="bg-grey-100 p-4 rounded mt-4"></div>
    </div>
  `;

  renderTodoList(username);
  renderCalender(username);
  renderNotifications(username);
};

export default renderUserPage;