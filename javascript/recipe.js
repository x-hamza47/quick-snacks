// ! Function to Get Url
function getCategoryUrl() {
  const params = new URLSearchParams(window.location.search);
  let recipe_id = params.get("recipe");
  let cat = params.get("category");
  return {
    category: cat,
    recipe: recipe_id,
  };
}
// ! Function to print data
const data_container = document.querySelector(".data-container");
(async function () {
  const category = getCategoryUrl();

  if (!category.category && !category.recipe) {
    console.error("Category or Recipe not found");
    return;
  }
  try {
    const response = await fetch(`../data/${category.category}.json`);
    if (!response.ok) {
      throw new Error("Failed to load recipes");
    }
    const data = await response.json();

    const recipe = data.find((recipe) => recipe.id == category.recipe);
    //  ? Ratings
    let starsList = "";
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(recipe.rating)) {
        starsList += "<i class='bx bxs-star'></i>";
      } else if (i < Math.ceil(recipe.rating)) {
        starsList += "<i class='bx bxs-star-half'></i>";
      } else {
        starsList += "<i class='bx bx-star'></i>";
      }
    }
    // ? Ingredients
    let ing_list = "";
    recipe.ingredients.map((ingredient, index) => {
      ing_list += `
        <span>
          <input type="checkbox" class="checkbox" id="checkbox${index}" />
          <label for="checkbox${index}">${ingredient}</label>
        </span>
      `;
    });
    // ? Instructions
    let instr_list = "";
    recipe.instructions.map((instruction, index) => {
      instr_list += `
        <div class="inst-step d-flex align-items-baseline">
          <span class="inst-badge d-flex align-items-center justify-content-center fw-bold">${
            index + 1
          }</span>
          <p>${instruction}</p>
        </div>
      `;
    });
    let nutri_facts = "";
    recipe.recipe_facts.map((fact) => {
      let average = (fact.range[0] + fact.range[1]) / 2;
      let barWidth = (average / fact.max) * 100;
      nutri_facts += `
        <li style="--bar-width: ${barWidth}%; --bg-color: 245, 145, 31">
          ${fact.name} <span class="fw-semibold">${fact.range[0]}-${fact.range[1]} kcal</span>
        </li>
      `;
    });

    let recipe_container = `
     <h2 class="explore-head fs-1 text-left fw-bold text-light" style="max-width:60%;">
            Recipe:
            <span style="color: var(--primary-color)">${recipe.name}</span>
          </h2>
          <div class="w-100 d-flex flex-wrap justify-content-center gap-3">
            <div class="rec-img">
              <div
                class="rec-details d-flex flex-wrap justify-content-between align-items-center my-1"
              >
                <span
                  ><i class="bx bxs-user-circle fs-6"></i>Author: ${recipe.author}</span
                >
                <span
                  ><i class="bx bxs-calendar fs-6"></i>Created on: ${recipe.createdOn}</span
                >
                <span
                  ><i class="bx bx-message-rounded-dots fs-6"></i>Comments</span
                >
                <span><i class="bx bx-bookmark fs-6"></i>Save</span>
                <div class="card-rating px-2 d-flex fs-6">
                 ${starsList} 
                  <span>(${recipe.rating}/5)</span>
                </div>
              </div>
              <!-- ! Thumbnail -->
              <div class="recipe-thumbnail rounded my-2">
                <img
                  class="w-100 h-100 rounded"
                  src="${recipe.img}"
                  alt="recipe-image"
                />
              </div>
              <!-- ? Preparation Details -->
              <div
                class="prep detail-bx d-flex w-100 justify-content-center my-2 rounded"
              >
                <div
                  class="detail-box flex-fill d-flex flex-column px-xl-5 py-2 px-sm-2 px-md-3 px-2 text-center"
                >
                  Prep Time
                  <span
                    class="d-flex align-items-center justify-content-center gap-1"
                    ><i class="bx bx-restaurant fs-5"></i>${recipe.prepTimeMinutes} Min</span
                  >
                </div>
                <div
                  class="detail-box flex-fill d-flex flex-column px-xl-5 py-2 px-sm-2 px-md-3 px-2 text-center"
                >
                  Cook Time
                  <span
                    class="d-flex align-items-center justify-content-center gap-1"
                    ><i class="bx bx-time fs-5"></i> ${recipe.cookTimeMinutes} Min</span
                  >
                </div>
                <div
                  class="detail-box flex-fill d-flex flex-column px-xl-5 py-2 px-sm-2 px-md-3 px-2 text-center"
                >
                  Serving
                  <span
                    class="d-flex align-items-center justify-content-center gap-1"
                    ><i class="bx bx-group fs-5"></i> ${recipe.servings}</span
                  >
                </div>
              </div>
              <p class="text-light">
                ${recipe.description}
              </p>
              <!-- Info: Ingredients -->
              <div class="ingredients-container my-5">
                <div class="container">
                  <h2 class="explore-head fs-1 text-left fw-bold text-light">
                    Ingredients
                    <span style="color: var(--primary-color)">List</span>
                  </h2>
                  <div
                    class="checks d-flex flex-column gap-3 mt-3 px-3 py-4 rounded"
                  >
                    ${ing_list}
                  </div>
                </div>
              </div>
              <!-- Info: Instructions -->
              <div class="instruction-container my-5">
                <div class="container text-light">
                  <h2 class="explore-head fs-1 text-left fw-bold text-light">
                    Instructions
                    <span style="color: var(--primary-color)"
                      >Step by Step</span
                    >
                  </h2>
                  <!-- ! Instruction Wrapper -->
                  <div class="inst-wrapper mt-3 px-3 py-4 rounded">
                   ${instr_list}
                  </div>
                </div>
              </div>
              <!-- Info: Cooking Note -->
              <div class="note-container">
                <div class="container text-light">
                  <h2 class="explore-head fs-1 text-left fw-bold text-light">
                    Cooking
                    <span style="color: var(--primary-color)"
                      >Note</span
                    >
                  </h2>
                  <div class="w-100">
                    <div>
                      ${recipe.cookingNote}
                    </div>
                  </div>
                </div>
              </div>



              <!-- Info: Feedback -->
              
              <div class="feedback my-5">
              <div class="container">
                <h2 class="explore-head fs-1 text-left fw-bold text-light">
                  Recipe
                  <span style="color: var(--primary-color)">Feedback</span>
                </h2>
                <div class="checks d-flex flex-column gap-3 mt-3 px-3 py-4 rounded">
                  <div class="recipe-rating">

                    <div class="rating">
                      <input value="5" name="rating" id="star5" type="radio" />
                      <label title="5 stars" for="star5">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgOne">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgTwo">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <div class="ombre"></div>
                      </label>

                      <input value="4" name="rating" id="star4" type="radio" />
                      <label title="4 stars" for="star4">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgOne">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgTwo">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <div class="ombre"></div>
                      </label>

                      <input value="3" name="rating" id="star3" type="radio" />
                      <label title="3 stars" for="star3">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgOne">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgTwo">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <div class="ombre"></div>
                      </label>

                      <input value="2" name="rating" id="star2" type="radio" />
                      <label title="2 stars" for="star2">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgOne">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgTwo">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <div class="ombre"></div>
                      </label>

                      <input value="1" name="rating" id="star1" type="radio" />
                      <label title="1 star" for="star1">
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgOne">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#000000"
                          fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                          class="svgTwo">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                          </polygon>
                        </svg>
                        <div class="ombre"></div>
                      </label>
                    </div>
                    <div class="rating-recipe">
                    <span class='d-flex align-items-center justify-content-center'>
                    <img src="${recipe.img}"/>
                    ${recipe.name}
                    </span>                  
                    </div>

                  </div>
                  <textarea placeholder="Type here..." class="feedback"></textarea>
                  <div class="d-flex justify-content-end">
                    <button class="btn-feed" onclick="sendPost()">Post</button>
                  </div>
                </div>
              </div>
            </div>



            </div>
            <div class="recipe-about">
              <h4 class="text-center">
                Nutritious
                <span style="color: var(--primary-color)"> Facts</span>
              </h4>
              <ul class="nutritional-bar w-100 py-4 px-3 rounded">
                ${nutri_facts}
            </ul>
        </div>
    </div>
     `;
    data_container.innerHTML = recipe_container;

    //  ! CheckBox Animation

    const chck_bxs = document.querySelectorAll(".checkbox");

    chck_bxs.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        let text = checkbox.nextElementSibling;
        if (checkbox.checked) {
          text.classList.add("checked");
        } else {
          text.classList.remove("checked");
        }
      });
    });
  } catch (err) {
    console.log("error fetching recipes " + err);
  }
})();

let categor = document.querySelector(".categories-list");
document.querySelector(".categories-action").addEventListener("click", (e) => {
  e.preventDefault()
  if (categor.classList.contains("hide")) {
    categor.classList.replace("hide", "show");
  } else {
    categor.classList.replace("show", "hide");
  }
});

const categorie = document.querySelectorAll(".category-body");

categorie.forEach( ( category ) => {
  category.addEventListener("click" , () =>  {
    let cat_name = category.getAttribute("data-cat");
    console.log(cat_name);
    
    window.location.href = `recipes.html?category=${cat_name}`;
  })
})

