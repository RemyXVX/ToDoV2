const renderToDoList = (username) => {
  const todoListContainer = document.getElementById("todo-list");
  const todos = JSON.parse(localStorage.getItem9(`${username}-todos`)) || [];

  const renderTodos = () => {
    todoListContainer.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">To Do List</h2>
    <ul class="space-y-2">
      ${todos.map((todo, index) => `
        <li class="flex justify-between items-center">
          <span>${todo.completed ? 'line-through trext-grey-400' : ''}">${todo.text}</span>
          <div>
            <button class="bg-green-500 text white px-2 py-1 rounded" onclick="toggleComplete(${index})">Complete</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTodo(${index})">Delete</button>
          </div>
        </li>
      `).join('')}
    </ul>
    <form id"add-todo-form" class="mt-4">
      <input type="text" id="new-task" class="p-2 border border-gray-300 rounded w-full" placeholder="New task">
      <button type="submit" class="mt-2 p-2 bg-blue-500 text-white rounded">Add Task</button>
    </form>
    `;
  };

  const addTodo = (text) => {
    todos.push({ text, completed: false });
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

  document.getElementById("add-todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("new-task").value;
    if (text) {
      addTodo(text);
      document.getElementById("new-task").value = "";
    }
  });

  renderTodos();

  };

export default renderToDoList;