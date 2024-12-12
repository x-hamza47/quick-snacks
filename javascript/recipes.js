const card_container = document.querySelector(".card-container");
// ! Function to get url
function getCategoryUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category"); 
}
// ! Function to get random Categories
async function getCategories(categories) {
  const fetch_categories = categories.map(category =>
    fetch(`../data/${category}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load recipes");
        }
        return response.json();
      })
  );
  return Promise.all(fetch_categories);
}

const getRandomRecipes = (recipes, count) =>{
  const shuffled = recipes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
// ! Function to show Recipes
(async function () {
  const category = getCategoryUrl();
  const all_categories = ['appetizer','easy-on-stomach','healthy-snacks','pasta','pizza','salad','smoothies','snacks-for-kids'];

     try{ 

      let recipes = [];

      if(category) {
        const response = await fetch(`../data/${category}.json`);
        if (!response.ok) {
          throw new Error("Failed to load recipes");
        }
        recipes = await response.json();

      }else{
        const category_data = await getCategories(all_categories);
        recipes = category_data.flat();
        
        recipes = getRandomRecipes(recipes,12);
      }

      recipes.forEach(recipe => {
        // ? Ratings Logic
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
        let recipe_card = `
                   <div class="card recipe-card" style="width: 18rem;" data-id="${recipe.id}" data-category="${recipe.category}">
                    <div class="card-img  overflow-hidden d-flex">
                        <img class="w-100 object-fit-cover" src="./assets/images/avacado-toast-2.jpg">
                    </div>
                    <div class="card-body text-center d-flex flex-column justify-content-between">
                        <small class="cat-title" style="text-transform:capitalize;">${recipe.category.replace(/-/g," ")}</small>
                        <h5 class="card-title">${
                          recipe.name
                        }</h5>                    
                        <p class="card-text">${
                          recipe.description.substring(0, 60) + "..."
                        }</p>
                    
                        <div class="card-rating px-2 d-flex justify-content-center fs-5">
                            ${starsList}
                        </div>
                        <div class="detail-bx p-2 d-flex align-items-center justify-content-evenly mt-3 gap-2 rounded">
                            <div class="bx d-flex align-items-center gap-1">
                                <i class='bx bxs-user text-danger'></i>
                                <span>${recipe.author}</span>
                            </div>
                            <div class="bx d-flex align-items-center gap-1">
                                <i class='bx bx-stopwatch text-danger'></i>
                                <span>${recipe.cookTimeMinutes} min</span>
                            </div>
                            <div class="bx d-flex align-items-center gap-1">
                                <i class='bx bxs-hot text-danger'></i>
                                <span>${
                                  recipe.recipe_facts[0].range[0]
                                } kcal</span>
                            </div>
                        </div>
                    </div>
                </div>`;

        card_container.innerHTML += recipe_card;
      });
      
      
  }catch (err){
    console.log("Error fetching recipes "+ err);
  }
})();


// Function to send recipe
card_container.addEventListener("click", (event) =>{
  const card = event.target.closest(".card");

  if(card) {
    let recipe_category = card.dataset.category.toLowerCase();
    let recipe_id = card.dataset.id;

    window.location.href = `recipe.html?recipe=${recipe_id}&category=${recipe_category}`;
  }

})
