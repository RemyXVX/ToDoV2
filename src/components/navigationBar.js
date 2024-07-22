const renderNavigationBar = () => {
  const navigationBar = document.getElementById('navigationBar');
  navigationBar.innerHTML = `
    <div class="bg-blue-500 p-4">
      <ul class="flex space-x-4">
        <li><a href="#" id="nav-home" class="text-white">Home</a></li>
        <li><a href="#" id="nav-login" class="text-white">Login</a></li>
      </ul>
    </div>
  `;

  document.getElementById('nav-home').addEventListener('click', () => {
    renderHome();
  });

  document.getElementById('nav-login').addEventListener('click', () => {
    renderLoginForm();
  });
};

export default renderNavigationBar;