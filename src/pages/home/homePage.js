const renderHomePage = () => {
  const mainContent = document.getElementById('homePage');

  mainContent.innerHTML = '';

  const heroSection = document.createElement('div');
  heroSection.className = 'hero bg-gradient-to-r from-blue-400 to-indigo-500 text-white mt-10 p-6 md:p-12 text-center rounded-lg shadow-2xl mb-8 md:mb-12';

  const heroTitle = document.createElement('h1');
  heroTitle.className = 'text-3xl md:text-5xl font-extrabold mb-4 md:mb-6';
  heroTitle.textContent = 'Welcome to ToDoList - Your Ultimate Task Manager!';
  
  const heroDescription = document.createElement('p');
  heroDescription.className = 'text-lg md:text-xl mb-6 md:mb-8';
  heroDescription.textContent = 'Stay organized, stay productive. Manage your tasks effortlessly with our powerful features.';

  heroSection.appendChild(heroTitle);
  heroSection.appendChild(heroDescription);

  const featuresSection = document.createElement('div');
  featuresSection.className = 'features grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6';

  const features = [
    { title: 'Task Management', description: 'Create, update, and manage all your tasks with ease.', icon: '📋' },
    { title: 'Calendar Integration', description: 'Sync tasks with your calendar for better time management.', icon: '📅' },
    { title: 'Notifications', description: 'Get reminders and notifications for upcoming tasks.', icon: '🔔' }
  ];

  features.forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.className = 'feature-card bg-white p-4 md:p-6 rounded-lg shadow-lg text-center border border-gray-200';
    
    const featureIcon = document.createElement('div');
    featureIcon.className = 'text-4xl md:text-6xl mb-4 md:mb-6 text-indigo-500';
    featureIcon.textContent = feature.icon;

    const featureTitle = document.createElement('h2');
    featureTitle.className = 'text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-gray-800';
    featureTitle.textContent = feature.title;
    
    const featureDescription = document.createElement('p');
    featureDescription.className = 'text-gray-600 text-sm md:text-base';
    featureDescription.textContent = feature.description;

    featureCard.appendChild(featureIcon);
    featureCard.appendChild(featureTitle);
    featureCard.appendChild(featureDescription);

    featuresSection.appendChild(featureCard);
  });

  const ctaSection = document.createElement('div');
  ctaSection.className = 'cta text-center mt-8 md:mt-12';

  const loginButton = document.createElement('button');
  loginButton.className = 'bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-lg mr-4 md:mr-6 shadow-lg';
  loginButton.textContent = 'Login';
  loginButton.addEventListener('click', () => {
    navigateTo('/login');
  });

  const signupButton = document.createElement('button');
  signupButton.className = 'bg-indigo-500 hover:bg-indigo-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-lg shadow-lg';
  signupButton.textContent = 'Sign Up';
  signupButton.addEventListener('click', () => {
    navigateTo('/login');
  });

  ctaSection.appendChild(loginButton);
  ctaSection.appendChild(signupButton);

  mainContent.appendChild(heroSection);
  mainContent.appendChild(featuresSection);
  mainContent.appendChild(ctaSection);
};

export default renderHomePage;
