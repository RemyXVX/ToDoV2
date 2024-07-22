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
                ${todo.editing ? `
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
            ${todo.details && !todo.editing ? `
              <p class="mt-2 text-sm text-gray-600">Details: ${todo.details}</p>
            ` : ''}
          </li>
        `).join('')}
      </ul>
      <form id="add-todo-form" class="mt-4">
        <input type="text" id="new-task" class="p-2 border border-gray-300 rounded w-full" placeholder="New task">
        <button type="submit" class="mt-2 p-2 bg-blue-500 text-white rounded">Add Task</button>
      </form>
    `;

    // Attach event listener after rendering
    const form = document.getElementById("add-todo-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = document.getElementById("new-task").value;
        if (text) {
          addTodo(text);
          document.getElementById("new-task").value = "";
        }
      });
    }
  };

  const addTodo = (text) => {
    todos.push({ text, completed: false, details: '', editing: false });
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
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

    if (newText) {
      todos[index].text = newText;
    }
    if (newDetails) {
      todos[index].details = newDetails;
    }
    
    todos[index].editing = false;
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
  };

  const cancelEdit = (index) => {
    todos[index].editing = false;
    localStorage.setItem(`${username}-todos`, JSON.stringify(todos));
    renderTodos();
  };

  // Expose functions to global scope
  window.toggleComplete = toggleComplete;
  window.deleteTodo = deleteTodo;
  window.toggleEdit = toggleEdit;
  window.saveEdit = saveEdit;
  window.cancelEdit = cancelEdit;

  renderTodos();
};

export default renderToDoList;