import { publish } from "../hooks/pubsub.js";
import taskOp from "./task/taskOp.js";

const renderToDoList = (username) => {
  const todoListContainer = document.getElementById("todo-list");
  if (!todoListContainer) {
    console.error("Element with id 'todo-list' not found");
    return;
  }

  taskOp.todos = JSON.parse(localStorage.getItem(`${username}-todos`)) || [];
  taskOp.archivedTodos = JSON.parse(localStorage.getItem(`${username}-archivedTodos`)) || [];

  const updateTasksAndRedraw = () => {
    localStorage.setItem(`${username}-todos`, JSON.stringify(taskOp.todos));
    localStorage.setItem(`${username}-archivedTodos`, JSON.stringify(taskOp.archivedTodos));
    renderTodos();
    publish('tasksUpdated', taskOp.todos);
  };

  taskOp.setUpdateTasksAndRedrawCallback(updateTasksAndRedraw);

  const renderTodos = () => {
    const recentTodos = taskOp.todos.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).slice(0, 3);
    todoListContainer.innerHTML = '';

    const header = document.createElement('h2');
    header.className = 'text-2xl font-bold mb-4';
    header.textContent = 'Add New Task';
    todoListContainer.appendChild(header);

    const form = document.createElement('form');
    form.id = 'add-todo-form';
    form.className = 'mb-8';
    form.innerHTML = `
      <input type="text" id="new-task" class="p-2 border border-gray-300 rounded w-full" placeholder="New task" required>
      <input type="date" id="new-due-date" class="p-2 border border-gray-300 rounded w-full mt-2" placeholder="Due date" required>
      <button type="submit" class="mt-2 p-2 bg-blue-500 text-white rounded">Add Task</button>
    `;
    todoListContainer.appendChild(form);

    const taskListHeader = document.createElement('h2');
    taskListHeader.className = 'text-2xl font-bold mb-4';
    taskListHeader.textContent = 'Recent Tasks';
    todoListContainer.appendChild(taskListHeader);

    const taskList = document.createElement('ul');
    taskList.className = 'space-y-2';
    todoListContainer.appendChild(taskList);

    recentTodos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'flex flex-col space-y-2 border p-4 rounded-md';
      taskList.appendChild(li);

      const div = document.createElement('div');
      div.className = 'flex items-center justify-between';
      li.appendChild(div);

      const textDiv = document.createElement('div');
      textDiv.className = 'flex-grow';
      div.appendChild(textDiv);

      const span = document.createElement('span');
      span.className = todo.completed ? 'line-through text-gray-400 font-bold' : 'font-bold';
      span.id = `todo-text-${index}`;
      span.textContent = todo.text;
      textDiv.appendChild(span);

      ['details', 'creationDate', 'dueDate'].forEach(key => {
        const p = document.createElement('p');
        p.className = 'text-sm text-gray-500';
        p.textContent = `${key.replace(/([A-Z])/g, ' $1')}: ${todo[key] || 'Not set'}`;
        textDiv.appendChild(p);
      });

      if (todo.editing) {
        textDiv.innerHTML += taskOp.renderEditingFields(todo, index);
      } else {
        textDiv.innerHTML += taskOp.renderTaskControls(todo, index);
      }

      if (!todo.editing) {
        const archiveButton = document.createElement('button');
        archiveButton.className = 'px-2 py-1 bg-blue-500 text-white rounded self-start md:self-center mt-2 md:mt-0';
        archiveButton.textContent = 'Archive';
        archiveButton.onclick = () => taskOp.archiveTask(index);
        div.appendChild(archiveButton);
      }
    });

    form.onsubmit = handleFormSubmit;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = document.getElementById("new-task").value;
    const dueDate = document.getElementById("new-due-date").value;
    if (text && dueDate) {
      taskOp.addTodo(text, dueDate);
      document.getElementById("new-task").value = '';
      document.getElementById("new-due-date").value = '';
    }
  };

  updateTasksAndRedraw();
};

export default renderToDoList;
