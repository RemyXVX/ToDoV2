import renderNavigationBar from "../src/components/navigationBar.js";
import renderHomePage from "../src/pages/home/homePage.js";
import navigateTo from "../src/hooks/route.js";

document.addEventListener('DOMContentLoaded', () => {
  renderNavigationBar();
  navigateTo('homePage');
  renderHomePage();
});
