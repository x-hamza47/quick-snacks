const card_container = document.querySelector(".card-container");
function getCategoryUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category"); 
}

(async function () {
  const category = getCategoryUrl();
    
  if(!category) {
    console.error("No Category Found");
    return;
  }
  try{
     const response = await fetch(`../data/${category}.json`);
      if(!response.ok) {
        throw new Error("Failed to load recipes");
      }
      const data = await response.json();
      data.forEach(recipe => {
        // ? Ratings Logic
        let starsHTML = "";
        for (let i = 0; i < 5; i++) {
          if (i < Math.floor(recipe.rating)) {
            starsHTML += "<i class='bx bxs-star'></i>"; 
          } else if (i < Math.ceil(recipe.rating)) {
            starsHTML += "<i class='bx bxs-star-half'></i>"; 
          } else {
            starsHTML += "<i class='bx bx-star'></i>"; 
          }
        }
        let recipe_card = `
                   <div class="card" style="width: 18rem;">
                    <div class="card-img  overflow-hidden d-flex">
                        <img class="w-100 object-fit-cover" src="./assets/images/avacado-toast-2.jpg">
                    </div>
                    <div class="card-body text-center d-flex flex-column justify-content-between">
                        <small class="cat-title">${category}</small>
                        <h5 class="card-title">${recipe.name}</h5>                    
                        <p class="card-text">${recipe.description}</p>
                    
                        <div class="card-rating px-2 d-flex justify-content-center fs-5">
                            ${starsHTML}
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
                                <span>${recipe.recipe_facts[0].range[0]} kcal</span>
                            </div>
                        </div>
                    </div>
                </div>`;

        card_container.innerHTML += recipe_card;
      });
      
      
  }catch (err){
    console.log("error fetching recipes "+ err);
  }
})();