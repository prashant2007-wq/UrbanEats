document.addEventListener("DOMContentLoaded", function() 
{
  const button = document.querySelector("#toggleBtn");
  const toggleText = document.querySelector(".toggle-text");
  const body = document.querySelector("body");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light-mode") {
    body.className = "light-mode";
    toggleText.textContent = "Light";
  } else {
    body.className = "dark-mode";
    toggleText.textContent = "Dark";
  }
  button.addEventListener("click", function() {
    if (body.className === "dark-mode" || body.className === "") {
      body.className = "light-mode";
      toggleText.textContent = "Light";
      localStorage.setItem("theme", "light-mode");
    } else {
      body.className = "dark-mode";
      toggleText.textContent = "Dark";
      localStorage.setItem("theme", "dark-mode");
    }
  });
  const searchInput = document.querySelector("#searchInput");
  const restaurants = document.querySelectorAll(".restaurant");

  searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    restaurants.forEach(restaurant => {
      const name = restaurant.querySelector("h4").textContent.toLowerCase();
      const cuisine = restaurant.querySelectorAll("p")[0].textContent.toLowerCase();
      
      if (searchTerm === "" || name.includes(searchTerm) || cuisine.includes(searchTerm)) {
        restaurant.style.display = "block";
      } else {
        restaurant.style.display = "none";
      }
    });
  });
  const categories = document.querySelectorAll("#categories li");
  let currentCategory = "all";
  categories.forEach(category => {
    category.addEventListener("click", function() {
      categories.forEach(cat => cat.classList.remove("active-category"));
      this.classList.add("active-category");
      currentCategory = this.getAttribute("data-category");
      filterRestaurants();
    });
  });
  const ratingFilterBtn = document.querySelector("#ratingFilter");
  let ratingFilterActive = false;
  ratingFilterBtn.addEventListener("click", function() {
    ratingFilterActive = !ratingFilterActive;
    if (ratingFilterActive) {
      ratingFilterBtn.classList.add("active");
      ratingFilterBtn.textContent = "⭐ Clear Filter";
    } else {
      ratingFilterBtn.classList.remove("active");
      ratingFilterBtn.textContent = "⭐ 4.5+ Filter";
    }
    filterRestaurants();
  });
  function filterRestaurants() {
    restaurants.forEach(restaurant => {
      const restaurantCategory = restaurant.getAttribute("data-category");
      const restaurantRating = parseFloat(restaurant.getAttribute("data-rating"));
      
      let showByCategory = currentCategory === "all" || restaurantCategory === currentCategory;
      let showByRating = !ratingFilterActive || restaurantRating >= 4.5;
      
      if (showByCategory && showByRating) {
        restaurant.style.display = "block";
      } else {
        restaurant.style.display = "none";
      }
    });
  }
  const loadMoreBtn = document.querySelector("#loadMore");
  loadMoreBtn.addEventListener("click", function() {
    const hiddenRestaurants = document.querySelectorAll(".restaurant.hidden");
    hiddenRestaurants.forEach(restaurant => {
      restaurant.classList.remove("hidden");
      restaurant.style.display = "block";
    });
    if (hiddenRestaurants.length > 0) {
      loadMoreBtn.style.display = "none";
    }
  });
  const hiddenCount = document.querySelectorAll(".restaurant.hidden").length;
  if (hiddenCount === 0) {
    loadMoreBtn.style.display = "none";
  }
  
});
