const renderLoginForm = () => {
  const formContainer = document.getElementById("form-container");
  formContainer.innerHTML = `
      <form id="login-form" class="flex flex-col space-y-4">
          <input type="text" id="login-username" placeholder="Username" class="p-2 border border-gray-300 rounded">
          <input type="password" id="login-password" placeholder="Password" class="p-2 border border-gray-300 rounded">
          <div></div>
          <div id="login-error" class="text-red-500"></div>
          <button type="submit" class="p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
  `;

  const form = document.getElementById("login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
      displayError("login-error", "Username and password are required");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
    displayError("login-error", "");
      // Redirect to userpage
    } else {
      displayError("login-error", "Invalid username or password");
    }
  });
};

const displayError = (elementId, message) => {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
};

export default renderLoginForm;
