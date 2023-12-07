//logic for fetching api data and displaying on screen and console
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
          <img id="meal-img" src="${result.strMealThumb}" alt="${result.strMeal}">`;
    });
}

getData();

//Dark Mode logic-styles and layout will be changed in Milestone 3
const darkModeBtn = document.getElementById("dark-mode-btn");
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

//scroll to top logic
document.getElementById("scroll-top-btn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//timer logic
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

//more button logic

const morebtn = document.getElementById("get-more-btn");
morebtn.addEventListener("click", () => {
  getData();
});

//share on whatsapp button

const whatsapp = document.getElementsByClassName("return-to-home-btn");

for (let i = 0; i < whatsapp.length; i++) {
  whatsapp[i].addEventListener("click", () => {
    shareOnWhatsApp();
  });
}
function shareOnWhatsApp() {
  const textToShare =
    "This site is a great place to look for recipes.Give it a try." +
    `https://abhisheknaik1112.github.io/Food-Recipe-Website/`
    ;
  window.open(
    "https://api.whatsapp.com/send?text="+ encodeURIComponent(textToShare)
  );
}


//search logic by category
function getCategoryData(search) {
  const categoryapi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
 
  fetch(categoryapi)
     .then((response) => response.json())
     .then((data) => {
       const result = data;
       console.log(result);
     });
 }
 
 document.addEventListener('DOMContentLoaded', function () {
  const searchbtn = document.getElementById("search");
  const searchvalue = document.getElementById("search-term");
 
  searchbtn.addEventListener('click', function () {
     var search = searchvalue.value;
     console.log(search);
     getCategoryData(search);
  });
 
  searchvalue.addEventListener('keypress', function (event) {
     if (event.key === 'Enter') {
       var search = searchvalue.value;
       console.log(search);
       getCategoryData(search);
     }
  });
 });


