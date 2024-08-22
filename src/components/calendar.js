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

const setupCalendar = (username) => {
  const currentDate = new Date();
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();

  const calendarContainer = document.getElementById("calendar");
  if (!calendarContainer) {
    console.error("Failed to find calendar container during setup.");
    return;
  }

  calendarContainer.innerHTML = '';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'flex justify-between items-center p-4';

  const prevButton = document.createElement('button');
  prevButton.className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600';
  prevButton.textContent = 'Prev';
  prevButton.addEventListener('click', () => changeMonth(username, -1));
  headerDiv.appendChild(prevButton);

  const headerSpan = document.createElement('span');
  headerSpan.id = 'calendar-header';
  headerSpan.className = 'text-md md:text-lg lg:text-xl font-bold';
  headerDiv.appendChild(headerSpan);

  const nextButton = document.createElement('button');
  nextButton.className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600';
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', () => changeMonth(username, 1));
  headerDiv.appendChild(nextButton);

  calendarContainer.appendChild(headerDiv);

  const daysDiv = document.createElement('div');
  daysDiv.id = 'calendar-days';
  daysDiv.className = 'grid grid-cols-7 gap-1';
  calendarContainer.appendChild(daysDiv);

  const tasksDiv = document.createElement('div');
  tasksDiv.id = 'tasks-for-day';
  tasksDiv.className = 'mt-4';
  calendarContainer.appendChild(tasksDiv);

  console.log('Calendar setup completed.');
};

const drawCalendar = (username) => {
  const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  const firstDay = (new Date(currentYear, currentMonth)).getDay();
  const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
  const headerDate = new Date(currentYear, currentMonth).toLocaleDateString('en-us', { month: 'long', year: 'numeric' });

  const calendarHeader = document.getElementById("calendar-header");
  if (calendarHeader) {
    calendarHeader.textContent = headerDate;
  } else {
    console.error("Calendar header not found");
    return;
  }

  let daysHTML = '';

  for (let i = 0; i < firstDay; i++) {
    daysHTML += '<div class="text-center py-2"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const taskCount = tasks.filter(task => task.dueDate === dateStr).length;
    daysHTML += `
      <div class="text-center py-2 border rounded cursor-pointer hover:bg-blue-100" data-date="${dateStr}">
        ${day} ${taskCount > 0 ? `<span class="text-xs text-gray-600">(${taskCount} tasks)</span>` : ''}
      </div>
    `;
  }

  const calendarDays = document.getElementById("calendar-days");
  if (calendarDays) {
    calendarDays.innerHTML = daysHTML;

    calendarDays.querySelectorAll('[data-date]').forEach(dayElem => {
      dayElem.addEventListener('click', (event) => {
        const dateStr = event.currentTarget.getAttribute('data-date');
        showTasksForDay(username, dateStr);
      });
    });
  } else {
    console.error("Calendar days container not found");
  }
};

const showTasksForDay = (username, dateStr) => {
  const tasksForDay = getTasksForDay(username, dateStr);
  const tasksDiv = document.getElementById('tasks-for-day');
  
  if (!tasksDiv) {
    console.error("Tasks-for-day container not found");
    return;
  }

  const formattedDate = new Date(dateStr).toLocaleDateString('en-us', { month: 'numeric', day: 'numeric', year: 'numeric' });

  if (tasksForDay.length > 0) {
    tasksDiv.innerHTML = `
      <h3 class="text-lg font-bold mb-2">Tasks for ${formattedDate}:</h3>
      <ul class="list-disc list-inside">
        ${tasksForDay.map((task, index) => `
          <li><a href="#" class="text-blue-500 hover:underline" onclick="navigateToTaskPage('${username}', '${dateStr}', ${index})">${task.text} (Due: ${task.dueDate})</a></li>
        `).join('')}
      </ul>
    `;
  } else {
    tasksDiv.innerHTML = `
      <h3 class="text-lg font-bold mb-2">Tasks for ${formattedDate}:</h3>
      <p>No tasks for this day.</p>
    `;
  }
};

window.navigateToTaskPage = (username, dateStr, taskIndex) => {
  localStorage.setItem('currentTaskDate', dateStr);
  localStorage.setItem('currentTaskIndex', taskIndex);
  window.location.href = 'userTaskPage.html';
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

export default renderCalendar;
