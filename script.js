
//fetching api data and displaying on screen and console
function getData() {
  const randommeal = document.getElementsByClassName(
    "recipe-of-the-day-container"
  );

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const result = data.meals[0];
      console.log(result);

      randommeal[0].innerHTML = `
          <h2>${result.strMeal}</h2>
          <img id="meal-img" src="${result.strMealThumb}" alt="${result.strMeal}">
        `;
    });
}

getData();

//dark mode button will change layout in Milestone 3 
const darkModeBtn = document.getElementById('dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});