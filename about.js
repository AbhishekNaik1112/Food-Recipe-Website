//new js file to remove reference error in about page

const darkModeBtn = document.getElementById("dark-mode-btn");
const appContainer = document.getElementById("app-container");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  appContainer.classList.toggle("dark-mode");
});
//dark mode logic
// .