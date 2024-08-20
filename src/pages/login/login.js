import renderLoginForm from '../login/loginForm.js';
import renderSignupForm from '../login/sigupForm.js';

const renderLoginPage = () => {
  const loginPage = document.getElementById('loginPage');
  loginPage.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div class="flex justify-center mb-4">
        <button id="show-login" class="px-4 py-2 bg-blue-500 text-white">Login</button>
        <button id="show-signup" class="px-4 py-2 bg-gray-200 text-gray-700">Sign Up</button>
      </div>
      <div id="form-container"></div>
    </div>
  `;

  document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('show-login').classList.add('bg-blue-500', 'text-white');
    document.getElementById('show-signup').classList.remove('bg-blue-500', 'text-white');
    document.getElementById('show-signup').classList.add('bg-gray-200', 'text-gray-700');
    renderLoginForm();
  });

  document.getElementById('show-signup').addEventListener('click', () => {
    document.getElementById('show-signup').classList.add('bg-blue-500', 'text-white');
    document.getElementById('show-login').classList.remove('bg-blue-500', 'text-white');
    document.getElementById('show-login').classList.add('bg-gray-200', 'text-gray-700');
    renderSignupForm();
  });

  renderLoginForm();
};

export default renderLoginPage;
