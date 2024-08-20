const taskOp = {
  todos: [],
  archivedTodos: [],

  setUpdateTasksAndRedrawCallback(callback) {
    this.updateTasksAndRedraw = callback;
  },

  updateTasksAndRedraw() {
    console.error('updateTasksAndRedraw is not defined');
  },

  addTodo(text, dueDate) {
    this.todos.push({ text, dueDate, completed: false, details: '', editing: false, creationDate: new Date().toISOString().split('T')[0] });
    this.updateTasksAndRedraw();
  },

  toggleComplete(index) {
    if (this.todos[index]) {
      this.todos[index].completed = !this.todos[index].completed;
      this.updateTasksAndRedraw();
    }
  },

  deleteTodo(index) {
    if (this.todos[index]) {
      this.todos.splice(index, 1);
      this.updateTasksAndRedraw();
    }
  },

  toggleEdit(index) {
    if (this.todos[index]) {
      this.todos[index].editing = !this.todos[index].editing;
      this.updateTasksAndRedraw();
    }
  },

  saveEdit(index, newText, newDetails, newDueDate) {
    const todo = this.todos[index];
    if (todo) {
      todo.text = newText || todo.text;
      todo.details = newDetails || todo.details;
      todo.dueDate = newDueDate || todo.dueDate;
      todo.editing = false;
      this.updateTasksAndRedraw();
    }
  },

  cancelEdit(index) {
    if (this.todos[index]) {
      this.todos[index].editing = false;
      this.updateTasksAndRedraw();
    }
  },

  archiveTask(index) {
    if (this.todos[index]) {
      this.archivedTodos.push(this.todos.splice(index, 1)[0]);
      this.updateTasksAndRedraw();
    }
  },

  renderEditingFields(todo, index) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <input type="text" value="${todo.text}" id="edit-text-${index}" class="p-2 border border-gray-300 rounded w-full">
        <input type="date" value="${todo.dueDate}" id="edit-due-date-${index}" class="p-2 border border-gray-300 rounded w-full">
        <textarea id="edit-details-${index}" class="p-2 border border-gray-300 rounded w-full mt-2" rows="3">${todo.details}</textarea>
        <div class="flex justify-end space-x-2 mt-2">
          <button onclick="taskOp.saveEdit(${index}, document.getElementById('edit-text-${index}').value, document.getElementById('edit-details-${index}').value, document.getElementById('edit-due-date-${index}').value)" class="px-2 py-1 bg-blue-500 text-white rounded">Save</button>
          <button onclick="taskOp.cancelEdit(${index})" class="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
        </div>
      </div>
    `;
  },

  renderTaskControls(todo, index) {
    return `
      <button onclick="taskOp.toggleEdit(${index})" class="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
      <button onclick="taskOp.deleteTodo(${index})" class="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
      <button onclick="taskOp.toggleComplete(${index})" class="px-2 py-1 ${todo.completed ? 'bg-gray-500' : 'bg-green-500'} text-white rounded">${todo.completed ? 'Undo Complete' : 'Complete'}</button>
    `;
  }
};

export default taskOp;
