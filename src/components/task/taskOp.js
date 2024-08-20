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
    const container = document.createElement('div');
    container.className = 'flex flex-col space-y-2 mt-2';

    const editText = document.createElement('input');
    editText.type = 'text';
    editText.value = todo.text;
    editText.id = `edit-text-${index}`;
    editText.className = 'p-2 border border-gray-300 rounded w-full';
    container.appendChild(editText);

    const editDueDate = document.createElement('input');
    editDueDate.type = 'date';
    editDueDate.value = todo.dueDate;
    editDueDate.id = `edit-due-date-${index}`;
    editDueDate.className = 'p-2 border border-gray-300 rounded w-full';
    container.appendChild(editDueDate);

    const editDetails = document.createElement('textarea');
    editDetails.id = `edit-details-${index}`;
    editDetails.className = 'p-2 border border-gray-300 rounded w-full';
    editDetails.rows = 3;
    editDetails.textContent = todo.details;
    container.appendChild(editDetails);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2';
    container.appendChild(buttonContainer);

    const saveButton = document.createElement('button');
    saveButton.className = 'px-3 py-1 bg-blue-500 text-white rounded';
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', this.saveEdit.bind(this, index, editText.value, editDetails.value, editDueDate.value));
    buttonContainer.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.className = 'px-3 py-1 bg-gray-500 text-white rounded';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', this.cancelEdit.bind(this, index));
    buttonContainer.appendChild(cancelButton);

    return container;
  },

  renderTaskControls(todo, index) {
    const container = document.createElement('div');
    container.className = 'flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2';

    if (!todo.completed) {
      const editButton = document.createElement('button');
      editButton.className = 'px-3 py-1 bg-yellow-500 text-white rounded';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', this.toggleEdit.bind(this, index));
      container.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'px-3 py-1 bg-red-500 text-white rounded';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', this.deleteTodo.bind(this, index));
      container.appendChild(deleteButton);
    }

    const completeButton = document.createElement('button');
    completeButton.className = `px-3 py-1 ${todo.completed ? 'bg-gray-500' : 'bg-green-500'} text-white rounded`;
    completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => {
      this.toggleComplete(index);
      this.updateTasksAndRedraw();
    });
    container.appendChild(completeButton);

    if (todo.completed) {
      const archiveButton = document.createElement('button');
      archiveButton.className = 'px-3 py-1 bg-blue-500 text-white rounded';
      archiveButton.textContent = 'Archive';
      archiveButton.onclick = () => this.archiveTask(index);
      container.appendChild(archiveButton);
    }

    return container;
  }
};

export default taskOp;
