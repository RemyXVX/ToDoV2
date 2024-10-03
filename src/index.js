import renderNavigationBar from "./components/navigationBar.js";
import renderHomePage from "./pages/home/homePage.js";
import navigateTo from "./hooks/route.js";

document.addEventListener('DOMContentLoaded', () => {
  renderNavigationBar();
  navigateTo('homePage');
  renderHomePage();
});
