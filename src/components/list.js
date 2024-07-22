import { publish } from "../hooks/pubsub.js";

const renderToDoList = (username) => {
  const todoListContainer = document.getElementById("todo-list");
  if (!todoListContainer) {
    console.error("Element with id 'todo-list' not found");
    return;
  }

  const todos = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];

  const renderTodos = () => {
    todoListContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">To Do List</h2>
      <ul class="space-y-2">
        ${todos.map((todo, index) => `
          <li class="flex flex-col space-y-2 border p-4 rounded-md">
            <div class="flex items-center justify-between">
              <div>
                <span class="${todo.completed ? 'line-through text-gray-400' : ''}" id="todo-text-${index}">${todo.text}</span>
                <p class="text-sm text-gray-500">Created: ${todo.creationDate}</p>
                <p class="text-sm text-gray-500">Due: ${todo.dueDate || 'Not set'}</p>
                ${todo.editing ? `
                  <input type="date" value="${todo.dueDate}" id="edit-due-date-${index}" class="p-2 border border-gray-300 rounded mt-2">
                  <input type="text" value="${todo.text}" id="edit-text-${index}" class="p-2 border border-gray-300 rounded mt-2">
                  <textarea id="edit-details-${index}" class="p-2 border border-gray-300 rounded mt-2" rows="3">${todo.details}</textarea>
                  <div class="flex space-x-2 mt-2">
                    <button onclick="saveEdit(${index})" class="px-2 py-1 bg-blue-500 text-white rounded">Save</button>
                    <button onclick="cancelEdit(${index})" class="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
                  </div>
                ` : ''}
              </div>
              <div>
                <button onclick="toggleComplete(${index})" class="px-2 py-1 ${todo.completed ? 'bg-gray-500' : 'bg-green-500'} text-white rounded">Complete</button>
                <button onclick="toggleEdit(${index})" class="px-2 py-1 ${todo.editing ? 'bg-gray-500' : 'bg-yellow-500'} text-white rounded">${todo.editing ? 'Cancel Edit' : 'Edit'}</button>
                <button onclick="deleteTodo(${index})" class="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
            ${todo.details && !todo.editing ? `<p class="mt-2 text-sm text-gray-600">Details: ${todo.details}</p>` : ''}
          </li>
        `).join('')}
      </ul>
      <form id="add-todo-form" class="mt-4">
        <input type="text" id="new-task" class="p-2 border border-gray-300 rounded w-full" placeholder="New task">
        <input type="date" id="new-due-date" class="p-2 border border-gray-300 rounded w-full mt-2" placeholder="Due date">
        <button type="submit" class="mt-2 p-2 bg-blue-500 text-white rounded">Add Task</button>
      </form>
    `;

    const form = document.getElementById("add-todo-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = document.getElementById("new-task").value;
        const dueDate = document.getElementById("new-due-date").value;
        if (text) {
          addTodo(text);
          document.getElementById("new-task").value = "";
          document.getElementById("new-due-date").value = "";
        }
      });
    }
  };

  const updateTasksAndRedraw = () => {
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
    publish('tasksUpdated', todos);
  };

  const addTodo = (text, dueDate) => {
    todos.push({ text, dueDate, completed: false, details: '', editing: false, creationDate: new Date().toISOString().split('T')[0] });
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    updateTasksAndRedraw();
  };

  const toggleComplete = (index) => {
    todos[index].completed = !todos[index].completed;
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
  };

  const deleteTodo = (index) => {
    todos.splice(index, 1);
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
  };

  const toggleEdit = (index) => {
    todos[index].editing = !todos[index].editing;
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
  };

  const saveEdit = (index) => {
    const newText = document.getElementById(`edit-text-${index}`).value.trim();
    const newDetails = document.getElementById(`edit-details-${index}`).value.trim();
    const newDueDate = document.getElementById(`edit-due-date-${index}`).value;

    if (newText) todos[index].text = newText;
    if (newDetails) todos[index].details = newDetails;
    if (newDueDate) todos[index].dueDate = newDueDate;

    todos[index].editing = false;
    updateTasksAndRedraw();
  };

  const cancelEdit = (index) => {
    todos[index].editing = false;
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
  };

  window.toggleComplete = toggleComplete;
  window.deleteTodo = deleteTodo;
  window.toggleEdit = toggleEdit;
  window.saveEdit = saveEdit;
  window.cancelEdit = cancelEdit;

  renderTodos();
};

export default renderToDoList;
