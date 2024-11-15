import renderLoginPage from "../pages/login/login.js";
import renderArchive from "../pages/archive/archive.js";
import renderHomePage from "../pages/home/homePage.js";
import renderUserPage from "../user/userPage.js";
import renderUserTaskPage from "../user/userTaskPage.js"; 
import navigateTo from "../hooks/route.js";

const saveTaskContext = (username, taskId, taskDate) => {
  if (username && taskId) {
    localStorage.setItem('currentUsername', username);
    localStorage.setItem('currentTaskId', String(taskId));
    if (taskDate) {
      localStorage.setItem('currentTaskDate', taskDate);
    }
  }
};

const clearTaskContext = () => {
  sessionStorage.removeItem('currentTaskId');
  sessionStorage.removeItem('currentTaskDate');
};

const isLoggedIn = () => localStorage.getItem('currentUsername') !== null;

const logout = () => {
  localStorage.removeItem('currentUsername');
  sessionStorage.clear();
  clearTaskContext();
  renderNavigationBar();
  navigateTo('homePage');
  renderHomePage();
};

const renderNavigationBar = () => {
  const navigationBar = document.getElementById('navigationBar');
  navigationBar.innerHTML = '';

  const nav = document.createElement('nav');
  nav.className = 'bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg';

  const container = document.createElement('div');
  container.className = 'container mx-auto p-4 flex justify-between items-center';

  const title = document.createElement('div');
  title.className = 'text-white text-2xl font-bold cursor-pointer';
  title.textContent = 'ToDoList';
  title.addEventListener('click', () => {
    if (isLoggedIn()) {
      navigateTo('userPage');
      renderUserPage(localStorage.getItem('currentUsername'));
    } else {
      navigateTo('homePage');
      renderHomePage();
    }
  });

  const ul = document.createElement('ul');
  ul.className = 'flex space-x-6';

  const homeLi = document.createElement('li');
  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.id = 'nav-home';
  homeLink.className = 'text-white hover:text-gray-200 transition duration-300 ease-in-out';
  homeLink.textContent = 'Home';
  homeLi.appendChild(homeLink);
  ul.appendChild(homeLi);

  if (isLoggedIn()) {
    const archiveLi = document.createElement('li');
    const archiveLink = document.createElement('a');
    archiveLink.href = '#';
    archiveLink.id = 'nav-archive';
    archiveLink.className = 'text-white hover:text-gray-200 transition duration-300 ease-in-out';
    archiveLink.textContent = 'Archive';
    archiveLi.appendChild(archiveLink);
    ul.appendChild(archiveLi);

    const logoutLi = document.createElement('li');
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.id = 'nav-logout';
    logoutLink.className = 'text-white hover:text-gray-200 transition duration-300 ease-in-out';
    logoutLink.textContent = 'Logout';
    logoutLi.appendChild(logoutLink);
    ul.appendChild(logoutLi);
  } else {
    const loginLi = document.createElement('li');
    const loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.id = 'nav-login';
    loginLink.className = 'text-white hover:text-gray-200 transition duration-300 ease-in-out';
    loginLink.textContent = 'Login';
    loginLi.appendChild(loginLink);
    ul.appendChild(loginLi);
  }

  container.appendChild(title);
  container.appendChild(ul);
  nav.appendChild(container);
  navigationBar.appendChild(nav);

  homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (isLoggedIn()) {
      const username = localStorage.getItem('currentUsername');
      navigateTo('userPage');
      renderUserPage(username);
    } else {
      navigateTo('homePage');
      renderHomePage();
    }
  });

  if (isLoggedIn()) {
    const archiveLink = document.getElementById('nav-archive');
    archiveLink.addEventListener('click', (event) => {
      event.preventDefault();
      const username = localStorage.getItem('currentUsername');
      navigateTo('archivePage');
      renderArchive(username);
    });

    const logoutLink = document.getElementById('nav-logout');
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      logout();
    });

    window.navigateToTaskPage = (username, dateStr, taskId) => {
      if (!username || !taskId) {
        console.error('Missing required navigation parameters:', { username, taskId });
        return;
      }

      localStorage.setItem('currentUsername', username);
      saveTaskContext(username, taskId, dateStr);

      navigateTo('userTaskPage');
      renderUserTaskPage();
    };

    window.handleBackToCalendar = () => {
      const username = localStorage.getItem('currentUsername');
      clearTaskContext();
      navigateTo('userPage');
      renderUserPage(username);
    };
  } else {
    const loginLink = document.getElementById('nav-login');
    loginLink.addEventListener('click', (event) => {
      event.preventDefault();
      navigateTo('loginPage');
      renderLoginPage();
    });
  }
};

const renderLoginStatus = () => {
  const statusElement = document.getElementById('loginStatus');
  if (isLoggedIn()) {
    statusElement.textContent = 'Logged In';
    statusElement.className = 'text-green-500';
  } else {
    statusElement.textContent = 'Logged Out';
    statusElement.className = 'text-red-500';
  }
};

export { saveTaskContext, clearTaskContext, renderLoginStatus };
export default renderNavigationBar;