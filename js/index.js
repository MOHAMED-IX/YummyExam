/// <reference types="../@types/jquery"/>


let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
  $('body').css('overflow', 'visible');
})

// document.getElementById("openNavBtn").addEventListener("click", () => {
//   document.querySelector(".open-close-icon").classList.toggle("fa-x");
//   document.querySelector(".nav-tab").classList.toggle("d-none");
// });

function openSideNav() {
  $(".side-nav-menu").animate({
      left: 0
  }, 500)

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({
          top: 0
      }, (i + 5) * 100)
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({
      left: -boxWidth
  }, 500)

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate({
      top: 300
  }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
      closeSideNav()
  } else {
      openSideNav()
  }
})

async function getMeals() {
  rowData.innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  let data = await response.json();
  displayMeals(data.meals);
  // console.log(data.meals);
}

function displayMeals(meals) {
  let html = "";
  for (let meal of meals) {
    html += `
    <div class="col-md-3">
      <div onclick="getMealById(${meal.idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${meal.strMealThumb}" alt="">
        <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-3">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>
    </div>
    `;
  }
  rowData.innerHTML = html;
}

getMeals();

async function getCategories() {
  rowData.innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  let data = await response.json();
  displayCategories(data.categories);
  // console.log(data.categories);
}

function displayCategories(categories) {
  let html = "";
  for (let category of categories) {
    html += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${category.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${category.strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${category.strCategory}</h3>
                        <p>${category.strCategoryDescription.split(" ").slice(0,25).join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
  }
  rowData.innerHTML = html;
}

// getCategories();

async function getArea() {
  rowData.innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  let data = await response.json();
  displayArea(data.meals);
  // console.log(data.meals);
}

function displayArea(area) {
  let html = "";
  for (let item of area) {
    html += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${item.strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${item.strArea}</h3>
                </div>
        </div>
        `;
  }
  rowData.innerHTML = html;
}

// getArea();

async function getIngredients () {
  rowData.innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
  let data = await response.json();
  displayIngredients(data.meals.slice(0, 25));
  // console.log(data.meals);
}

function displayIngredients(ingredients) {
  let html = "";
  for (let item of ingredients) {
    html += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${item.strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${item.strIngredient}</h3>
                        <p>${item.strDescription.split(" ").slice(0,25).join(" ")}</p>
                </div>
        </div>
        `;
  }
  rowData.innerHTML = html;
}

// getIngredients();

async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let data = await response.json();
  displayMeals(data.meals);
  // console.log(data.meals);
}

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  let data = await response.json();
  displayMeals(data.meals.slice(0, 20));
  // console.log(data.meals);
}

async function getMealData(mealID) {
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let data = await response.json();
  displayMeals(data.meals[0]);
  // console.log(data.meals);
}

async function getIngredientsMeals(ingredient) {
  rowData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  let data = await response.json();
  displayMeals(data.meals.slice(0, 20));
  // console.log(data.meals);
}

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let html = `
  <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = html;
}

function showSearchInputs() {
  searchContainer.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`

  rowData.innerHTML = ""
}

async function searchByName(term) {
  closeSideNav()
  rowData.innerHTML = ""

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  response = await response.json()

  response.meals ? displayMeals(response.meals) : displayMeals([])

}

async function searchByFLetter(term) {
  closeSideNav()
  rowData.innerHTML = ""


  term == "" ? term = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  response = await response.json()

  response.meals ? displayMeals(response.meals) : displayMeals([])

}