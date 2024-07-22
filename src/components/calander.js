const renderCalender = () => {
  const calenderContainer = document.getElementById("calender");
  const todos = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];

  const dueDates = todos.reduce((account, todo) => {
    if (todo.dueDates) {
      account[todo.dueDates] = (account[todo.dueDates] || 0) + 1;
    }
    return account;
  } , {});
  
  calenderContainer.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Calender</h2>
    <ul class="space-y-2">
      ${Object.keys(dueDates).map(date => `
        <li class="flex justify-between items-center>
          <span>${date}</span>
          <span>${dueDates[date]} items</span>
        </li>
      `).join('')}
    </ul>
  `;
};

export default renderCalender;