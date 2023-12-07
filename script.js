//logic for fetching api data for random food and displaying on screen and console and modal of the random food

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

      randommeal[0].recipeDetails = {
        meal: result.strMeal,
        ingredients: getIngredients(result),
        instructions: result.strInstructions,
      };

      randommeal[0].onclick = displayRecipeModal;
    });
}

function displayRecipeModal() {
  const recipeDetails = document.getElementsByClassName(
    "recipe-of-the-day-container"
  )[0].recipeDetails;

  const modalContent = `
        <h2>${recipeDetails.meal}</h2>
        <h3>Ingredients:</h3>
        <ul>${recipeDetails.ingredients}</ul>
        <h3>Instructions:</h3>
        <p>${recipeDetails.instructions}</p>
    `;

  Swal.fire({
    html: modalContent,
    confirmButtonText: "Close",
  });
}

function getIngredients(result) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = result[`strIngredient${i}`];
    const measure = result[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`<li>${measure} ${ingredient}</li>`);
    }
  }
  return ingredients.join("");
}

getData();

//Dark Mode logic-styles and layout will be changed in Milestone 3
const darkModeBtn = document.getElementById("dark-mode-btn");
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

//scroll to top logic-styles and layout will be changed in Milestone 3
document.getElementById("scroll-top-btn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//timer logic-styles and layout will be changed in Milestone 3
const timerContainer = document.getElementById("active-timers");
document.getElementById("timer-start-btn").addEventListener("click", () => {
  let minutes = parseInt(document.getElementById("timer-input").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  createTimer(minutes);
});

function createTimer(minutes) {
  const endTime = new Date(new Date().getTime() + minutes * 60000);
  const timerItem = document.createElement("li");
  const endTimeSpan = document.createElement("span");
  const countdownSpan = document.createElement("span");
  const removeBtn = document.createElement("button");

  removeBtn.innerText = "Remove";
  removeBtn.onclick = () => {
    clearInterval(timerItem.intervalId);
    timerItem.remove();
  };

  endTimeSpan.innerText = `Ends at ${endTime.toLocaleTimeString()} `;
  countdownSpan.innerText = `${minutes}m 00s remaining`;

  timerItem.appendChild(endTimeSpan);
  timerItem.appendChild(countdownSpan);
  timerItem.appendChild(removeBtn);
  timerContainer.appendChild(timerItem);

  timerItem.intervalId = setInterval(() => {
    const now = new Date();
    const timeLeft = endTime.getTime() - now.getTime();

    if (timeLeft <= 0) {
      clearInterval(timerItem.intervalId);
      countdownSpan.innerText = `Time's up!`;
    } else {
      const minutesLeft = Math.floor(timeLeft / 60000);
      const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
      countdownSpan.innerText = `${minutesLeft}m ${secondsLeft}s remaining`;
    }
  }, 1000);
}

//more button logic-styles and layout will be changed in Milestone 3
const morebtn = document.getElementById("get-more-btn");
morebtn.addEventListener("click", () => {
  getData();
});

//share on whatsapp button-styles and layout will be changed in Milestone 3

const whatsapp = document.getElementsByClassName("return-to-home-btn");

for (let i = 0; i < whatsapp.length; i++) {
  whatsapp[i].addEventListener("click", () => {
    shareOnWhatsApp();
  });
}

function shareOnWhatsApp() {
  const textToShare =
    "This site is a great place to look for recipes.Give it a try." +
    `https://abhisheknaik1112.github.io/Food-Recipe-Website/`;
  window.open(
    "https://api.whatsapp.com/send?text=" + encodeURIComponent(textToShare)
  );
}

//search logic by category-styles and layout will be changed in Milestone 3
function getCategoryData(key) {
  let categoryapi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`;

  fetch(categoryapi)
    .then((response) => response.json())
    .then((result) => {
      const meals = result.meals;
      console.log(result);
      displayMeals(meals);
    })
    .catch((err) => {
      console.log("ll", err.message);
    });
}

function displayMeals(meals) {
  const mealsList = document.getElementById("meals");
  mealsList.innerHTML = "";

  meals.forEach((meal) => {
    const mealCard = `
   <div class="meal-card">
     <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
     <h3>${meal.strMeal}</h3>
   </div>
   `;
    mealsList.innerHTML += mealCard;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const searchbtn = document.getElementById("search");
  const searchvalue = document.getElementById("search-term");

  searchbtn.addEventListener("click", function () {
    var search = searchvalue.value;
    console.log(search);
    getCategoryData(search);
  });

  searchvalue.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      var search = searchvalue.value;
      console.log(search);
      getCategoryData(search);
    }
  });
});
