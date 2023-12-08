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

      randommeal[0].onclick = displayRecipeModal;
    });
}

function displayRecipeModal() {
  const recipeDetails = document.getElementsByClassName(
    "recipe-of-the-day-container" //displaying a popup modal which will contain the measure ingredients and instructions.
  )[0].recipeDetails;

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
  for (let i = 1; i <= 20; i++) {
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

//Dark Mode logic-styles and layout will be changed in Milestone 3
const darkModeBtn = document.getElementById("dark-mode-btn");
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode"); //dark mode button self explanatory
});

//scroll to top logic-styles and layout will be changed in Milestone 3
document.getElementById("scroll-top-btn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", //scroll to top self explanatory
  });
});

//more button logic-styles and layout will be changed in Milestone 3
const morebtn = document.getElementById("get-more-btn");
morebtn.addEventListener("click", () => {
  //this button will get a new random dish
  getData();
});

//share on whatsapp button-styles and layout will be changed in Milestone 3

const whatsappButton = document.getElementsByClassName("return-to-home-btn")[0];

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

//search logic by category-styles and layout will be changed in Milestone 3
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
  let detailsApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`; //the saved name in line 133 is passed here and the details of that dish is fetched.

  fetch(detailsApi)
    .then((response) => response.json())
    .then((result) => {
      const mealDetails = result.meals[0];

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = mealDetails[`strIngredient${i}`];
        const measure = mealDetails[`strMeasure${i}`];
        if (ingredient && measure) {
          // //as there are 20 measure and ingredients it will loop through 0<i<20 to gather all the ingredients and its measure
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      Swal.fire({
        title: mealDetails.strMeal,
        //paste the commented text in line 198 here and image will be shown for the search food when you open the popup
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
