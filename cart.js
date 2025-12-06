   let button = document.querySelector("#toggleBtn");
    let toggleText = document.querySelector(".toggle-text");
    
    button.addEventListener("click", function() {
      let body = document.querySelector("body");
      
      if (body.className === "dark-mode" || body.className === "") {
        body.className = "light-mode";
        toggleText.textContent = "Light";
      } else {
        body.className = "dark-mode";
        toggleText.textContent = "Dark";
      }
    });