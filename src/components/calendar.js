import { getTasksForDay } from '../hooks/utils.js';

const renderCalendar = (username) => {
  const calendarContainer = document.getElementById("calendar");
  if (!calendarContainer) {
    console.error("Calendar container not found");
    return;
  }

  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const drawCalendar = () => {
    const firstDay = (new Date(currentYear, currentMonth)).getDay();
    const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();

    const tasks = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
    const headerDate = new Date(currentYear, currentMonth).toLocaleDateString('en-us', {
      month: 'long',
      year: 'numeric'
    });

    let daysHTML = '<div class="grid grid-cols-7 gap-1">';

    for (let i = 0; i < firstDay; i++) {
      daysHTML += '<div class="text-center py-2"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
      const taskCount = tasks.filter(task => task.dueDate === dateStr).length;
      daysHTML += `
        <div class="text-center py-2 border rounded cursor-pointer hover:bg-blue-100" onclick="showTasksForDay('${dateStr}')">
          ${day} ${taskCount > 0 ? `<span class="text-xs text-gray-600">(${taskCount} tasks)</span>` : ''}
        </div>
      `;
    }
    

    daysHTML += '</div>';

    calendarContainer.innerHTML = `
      <div class="flex justify-between items-center p-4">
        <button onclick="changeMonth(-1)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Prev</button>
        <span class="text-md md:text-lg lg:text-xl font-bold">${headerDate}</span>
        <button onclick="changeMonth(1)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
      </div>
      ${daysHTML}
    `;
  };

  window.changeMonth = (step) => {
    currentMonth += step;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    } else if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    drawCalendar();
  };

  window.showTasksForDay = (dateStr) => {
    const tasksForDay = getTasksForDay(username, dateStr);
    console.log('Tasks for ' + dateStr + ':', tasksForDay);
    // Display tasks somewhere else, page or popup on UI
  };

  drawCalendar();
};

export default renderCalendar;
