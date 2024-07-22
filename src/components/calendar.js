import { getTasksForDay } from '../hooks/utils.js';
import { subscribe } from '../hooks/pubsub.js';

let currentMonth, currentYear;

const renderCalendar = (username) => {
  const calendarContainer = document.getElementById("calendar");
  if (!calendarContainer) {
    console.error("Calendar container not found");
    return;
  }

  setupCalendar(username);
  drawCalendar(username);

  subscribe('tasksUpdated', () => {
    drawCalendar(username);
  });
};

const redrawCalendar = (username) => {
  drawCalendar(username);
};

const setupCalendar = (username) => {
  const currentDate = new Date();
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();

  const calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = `
    <div class="flex justify-between items-center p-4">
      <button onclick="changeMonth('${username}', -1)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Prev</button>
      <span id="calendar-header" class="text-md md:text-lg lg:text-xl font-bold"></span>
      <button onclick="changeMonth('${username}', 1)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
    </div>
    <div id="calendar-days" class="grid grid-cols-7 gap-1"></div>
  `;
};

const drawCalendar = (username) => {
  const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  const firstDay = (new Date(currentYear, currentMonth)).getDay();
  const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
  const headerDate = new Date(currentYear, currentMonth).toLocaleDateString('en-us', { month: 'long', year: 'numeric' });
  
  document.getElementById("calendar-header").textContent = headerDate;
  
  let daysHTML = '';

  for (let i = 0; i < firstDay; i++) {
    daysHTML += '<div class="text-center py-2"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const taskCount = tasks.filter(task => task.dueDate === dateStr).length;
    daysHTML += `
      <div class="text-center py-2 border rounded cursor-pointer hover:bg-blue-100" onclick="showTasksForDay('${username}', '${dateStr}')">
        ${day} ${taskCount > 0 ? `<span class="text-xs text-gray-600">(${taskCount} tasks)</span>` : ''}
      </div>
    `;
  }

  document.getElementById("calendar-days").innerHTML = daysHTML;
};

window.changeMonth = (username, step) => {
  currentMonth += step;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  drawCalendar(username);
};

window.showTasksForDay = (username, dateStr) => {
  const tasksForDay = getTasksForDay(username, dateStr);
  console.log('Tasks for ' + dateStr + ':', tasksForDay);
  // Further implementation to show tasks details can be done here
};

export default renderCalendar;