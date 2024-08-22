import renderLoginForm from '../login/loginForm.js';
import renderSignupForm from '../login/sigupForm.js'; 

const renderLoginPage = () => {
  const loginPage = document.getElementById('loginPage');
  loginPage.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'flex justify-center mb-6 border-b pb-4';

  const loginButton = document.createElement('button');
  loginButton.id = 'show-login';
  loginButton.className = 'px-6 py-2 text-lg font-medium text-blue-600 border-b-2 border-blue-600';
  loginButton.textContent = 'Login';
  headerDiv.appendChild(loginButton);

  const signupButton = document.createElement('button');
  signupButton.id = 'show-signup';
  signupButton.className = 'px-6 py-2 text-lg font-medium text-gray-500';
  signupButton.textContent = 'Sign Up';
  headerDiv.appendChild(signupButton);

  const formContainer = document.createElement('div');
  formContainer.id = 'form-container';

  container.appendChild(headerDiv);
  container.appendChild(formContainer);
  loginPage.appendChild(container);

  loginButton.addEventListener('click', () => {
    activateButton(loginButton, signupButton);
    renderLoginForm();
  });

  signupButton.addEventListener('click', () => {
    activateButton(signupButton, loginButton);
    renderSignupForm();
  });

  function activateButton(active, inactive) {
    active.classList.add('text-blue-600', 'border-blue-600');
    active.classList.remove('text-gray-500', 'border-transparent');
    inactive.classList.add('text-gray-500', 'border-transparent');
    inactive.classList.remove('text-blue-600', 'border-blue-600');
  }

  renderLoginForm();
};

export default renderLoginPage;
