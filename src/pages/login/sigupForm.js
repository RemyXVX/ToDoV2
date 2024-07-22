const renderSignupForm = () => {
  const formContainer = document.getElementById('form-container');
  formContainer.innerHTML = `
      <form id="signup-form" class="flex flex-col space-y-4">
          <input type="text" id="signup-username" placeholder="Username" class="p-2 border border-gray-300 rounded">
          <input type="password" id="signup-password" placeholder="Password" class="p-2 border border-gray-300 rounded">
          <div id="password-strength" class="text-md"></div>
          <div id="signup-error" class="text-red-500"></div>
          <button type="submit" class="p-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
  `;

  const passwordInput = document.getElementById("signup-password");
  passwordInput.addEventListener('input', () => {
      const strength = checkPasswordStrength(passwordInput.value);
      document.getElementById("password-strength").textContent = `Password strength: ${strength}`;
  });

  const form = document.getElementById('signup-form');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById("signup-username").value;
      const password = document.getElementById("signup-password").value;

      if (!username || !password) {
          displayError("signup-error", "Username and password are required");
          return;
      }

      const userExists = localStorage.getItem(username);
      if (userExists) {
          displayError("signup-error", "User already exists");
          return;
      }

      localStorage.setItem(username, JSON.stringify({ password }));
      displayError("signup-error", "");
      // Redirect to userpage
  });
};

const checkPasswordStrength = (password) => {
  const regex = [
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /[^A-Za-z0-9]/
  ];
  let strength = 0;
  regex.forEach((regex) => {
      if (regex.test(password)) {
          strength++;
      }
  });
  return ['Weak', 'Moderate', 'Strong'][strength - 1] || 'Very Weak';
};

const displayError = (elementId, message) => {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
};

export default renderSignupForm;
