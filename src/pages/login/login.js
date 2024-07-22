const loginPageEl = document.getElementById('app');

const loginForm = `
  <div class="flex flex-col space-y-4 p-4">
    <h1 id="login-title">Login</h1>
    <div class="flex flex-col">
      <label for="username" class="text-gray-700">Username</label>
      <input type="text" id="username" class="border rounded-md p-2" required>
    </div>
    <div class="flex flex-col">
      <label for="password" class="text-gray-700">Password</label>
      <input type="password" id="password" class="border rounded-md p-2" required>
      <span id="password-strength"></span>
    </div>
    <div class="flex items-center">
      <input type="checkbox" id="remember-me" class="mr-2">
      <label for="remember-me" class="text-gray-700">Remember Me</label>
    </div>
    <button id="login-btn" class="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2">Login</button>
    <div id="error-message"></div>
  </div>
`;

const signupForm = `
  <div class="flex flex-col space-y-4 p-4">
    <h1 id="signup-title">Sign Up</h1>
    <div class="flex flex-col">
      <label for="signup-username" class="text-gray-700">Username</label>
      <input type="text" id="signup-username" class="border rounded-md p-2" required>
    </div>
    <div class="flex flex-col">
      <label for="signup-password" class="text-gray-700">Password</label>
      <input type="password" id="signup-password" class="border rounded-md p-2" required>
      <span id="signup-password-strength"></span>
    </div>
    <div class="flex flex-col">
      <label for="signup-confirm-password" class="text-gray-700">Confirm Password</label>
      <input type="password" id="signup-confirm-password" class="border rounded-md p-2" required>
    </div>
    <button id="signup-btn" class="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2">Sign Up</button>
    <div id="signup-error-message"></div>
  </div>
`;

let isSignup = false; 

const renderLoginForm = () => {
  loginPageEl.innerHTML = loginForm;
  updatePasswordStrength('password'); // Update on initial render
  document.getElementById('login-btn').addEventListener('click', handleLogin);
};

const renderSignupForm = () => {
  loginPageEl.innerHTML = signupForm;
  updatePasswordStrength('signup-password'); // Update on initial render
  document.getElementById('signup-btn').addEventListener('click', handleSignup);
};

const updatePasswordStrength = (passwordInputId) => {
  const passwordEl = document.getElementById(passwordInputId);
  const strengthEl = document.getElementById(`${passwordInputId}-strength`);
  const password = passwordEl.value;
  let strength = 'Weak';
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/; // Regex for at least 1 digit, lowercase, uppercase, and special character

  if (password.length >= 8 && regex.test(password)) {
    strength = 'Strong';
  } else if (password.length >= 6 && (regex.test(password.slice(0, password.length / 2)) || regex.test(password.slice(password.length / 2)))) {
    strength = 'Medium';
  }
  strengthEl.textContent = `Password Strength: ${strength}`;

const handleLogin = (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulate login logic (replace with your actual authentication)
  const isLoginSuccessful = username === 'user' && password === 'password123';

  const errorMessageEl = document.getElementById('error-message');
  errorMessageEl.textContent = '';

  if (isLoginSuccessful) {
    // Handle successful login (redirect, display success message, etc.)
    console.log('Login successful!');
  } else {
    errorMessageEl.textContent = 'Invalid username or password.';
  }
};

const handleSignup = (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  const errorMessageEl = document.getElementById('signup-error-message');
  errorMessageEl.textContent = '';

  if (password !== confirmPassword) {
    errorMessageEl.textContent = 'Passwords do not match.';
    return;
  }

  // Simulate signup logic (replace with your actual user creation)
  const isSignupSuccessful = true; // Replace with actual logic

  if (isSignupSuccessful) {
    // Handle successful signup (redirect, display success message, etc.)
    console.log('Signup successful!');
  } else {
    errorMessageEl.textContent = 'An error occurred during signup.';
  }
};

const toggleForm = () => {
  isSignup = !isSignup;
  if (isSignup) {
    renderSignupForm();
  } else {
    renderLoginForm();
  }
};

// Add event listener to a slider element (replace with your slider implementation)
document.getElementById('login-signup-slider').addEventListener('change', toggleForm);

// Initial render (assuming login form by default)
renderLoginForm();
}
