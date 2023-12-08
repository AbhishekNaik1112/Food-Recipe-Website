const MAX_INGREDIENTS = 20; //saving this const value so that it tells why we need 20 iterations

//logic for fetching api data for random food and displaying on screen and console and modal of the random food

function getData() {
  const randommeal = document.getElementsByClassName(
    "recipe-of-the-day-container"
  );

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      //fetching the random dish using the random api
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

      // randommeal[0].onclick = displayRecipeModal; this also works but the next one tells us exactly what is happening
      randommeal[0].addEventListener("click", displayRecipeModal);
    });
}

function displayRecipeModal() {
  // const recipeDetails = document.getElementsByClassName(
  // 	"recipe-of-the-day-container" )[0].recipeDetails;
  const recipeDetails = document.querySelector(
    ".recipe-of-the-day-container"
  ).recipeDetails;
  //displaying a popup modal which will contain the measure ingredients and instructions.
  // both of them work but using query selector makes sure that we are using the element that we need

  const modalContent = `
    <h2>${recipeDetails.meal}</h2>
    <h3>Ingredients:</h3><br>
    ${recipeDetails.ingredients}
    <h3>Instructions:</h3>
    <p>${recipeDetails.instructions}</p>                       
`; // grabs the instuctions

  Swal.fire({
    html: modalContent,
    confirmButtonText: "Close", //used the sweetalert cdn to implement the modal that is linked in the head of the html.
  });
}

function getIngredients(result) {
  const ingredients = [];
  for (let i = 1; i <= MAX_INGREDIENTS; i++) {
    //as there are 20 measure and ingredients it will loop through 0<i<20 to gather all the ingredients and its measure
    const ingredient = result[`strIngredient${i}`];
    const measure = result[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}<br>`);
    }
  }
  return ingredients.join("");
}

getData();

//Dark Mode logic
const darkModeBtn = document.getElementById("dark-mode-btn");
const appContainer = document.getElementById("app-container");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  appContainer.classList.toggle("dark-mode");
});

//scroll to top logic
document.getElementById("scroll-top-btn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", //scroll to top self explanatory
  });
});

//more button logic
const morebtn = document.getElementById("get-more-btn");
morebtn.addEventListener("click", () => {
  //this button will get a new random dish
  getData();
});

//share on whatsapp button

const whatsappButton = document.getElementsByClassName("share")[0];

whatsappButton.addEventListener("click", () => {
  shareOnWhatsApp();
}); //event listener for whatsapp share with text

function shareOnWhatsApp() {
  const textToShare =
    "This site is a great place to look for recipes.Give it a try." +
    `https://abhisheknaik1112.github.io/Food-Recipe-Website/`;
  window.open(
    "https://api.whatsapp.com/send?text=" + encodeURIComponent(textToShare)
  );
}

//search logic by category
function getCategoryData(key) {
  let categoryapi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`;

  fetch(categoryapi)
    .then((response) => response.json()) //fetching the dishes of the entered category
    .then((result) => {
      const meals = result.meals;
      console.log(result);
      displayMeals(meals);
    })
    .catch((err) => {
      console.log("Error fetching meal details:", err.message);
    });
}

function displayMeals(meals) {
  const mealsList = document.getElementById("meals");
  mealsList.innerHTML = "";

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");

    const mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal; //creating divs with image and name for the searched category

    const mealName = document.createElement("h3");
    mealName.textContent = meal.strMeal; //saving this name so that when a dish image is clicked it will be passed in the api by name and will gather the data of that specific dish

    mealCard.appendChild(mealImage);
    mealCard.appendChild(mealName);

    mealsList.appendChild(mealCard);

    mealCard.addEventListener("click", function () {
      getMealDetails(meal.strMeal);
    });
  });
}

function getMealDetails(mealName) {
  let detailsApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`; //the saved name in line 138 is passed here and the details of that dish is fetched.

  fetch(detailsApi)
    .then((response) => response.json())
    .then((result) => {
      const mealDetails = result.meals[0];

      const ingredients = [];
      for (let i = 1; i <= MAX_INGREDIENTS; i++) {
        const ingredient = mealDetails[`strIngredient${i}`];
        const measure = mealDetails[`strMeasure${i}`];
        if (ingredient && measure) {
          // //as there are 20 measure and ingredients it will loop through 0<i<20 to gather all the ingredients and its measure
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      Swal.fire({
        title: mealDetails.strMeal,
        //paste the commented text in line 203 here and image will be shown for the search food when you open the popup
        html: `<p><h3>Ingredients:</h3>${ingredients.join(
          "<br>"
        )}</p><p><h3>Instructions:</h3>${mealDetails.strInstructions}</p>`,
        confirmButtonText: "Close",
      });
    })
    .catch((err) => {
      console.log("Error fetching meal details:", err.message);
    });
}
//giving a eventlistener i.e enter button so that when a category name is entered it will be passed in the category fetch
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

//If needed can generate the image for popup with this
// imageUrl: mealDetails.strMealThumb,
//imageAlt: mealDetails.strMeal,