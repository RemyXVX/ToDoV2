const navigateTo = (pageId) => {
  const pages = document.querySelectorAll('[data-page]');

  pages.forEach(page => {
    page.style.display = 'none';
  });

  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.style.display = 'block';
  } else {
    console.error(`Page with ID ${pageId} not found`);
  }
};

export default navigateTo;
