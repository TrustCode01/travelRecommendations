fetch("travel_recommendation_api.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const shell = document.getElementById("container");
    const search = document.getElementById("search-btn");

    search.addEventListener("click", (e) => {
      e.preventDefault(); 
      let term = document.getElementById("search").value.toLowerCase();
      console.log(term);
      
      if (term) {
        shell.innerHTML = ''; // Clear previous results only if term is not empty

        try {
          if (term === "temple" || term === "temples") {
            data.temples.forEach(item => {
              const element = document.createElement("article");
              element.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <a href="#" class="btn btn-success btn-outline">Visit</a>`;
              shell.appendChild(element);
            });
          } else if (term === "beach" || term === "beaches") {
            data.beaches.forEach(item => {
              const postElement = document.createElement("article");
              postElement.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <a href="#" class="btn btn-success btn-outline">Visit</a>`;
              shell.appendChild(postElement);
            });
          } else if (term === "austaulia" || term==="brazil" || term==="india" || term==="country") {
            data.countries.forEach(item => {
              const el = document.createElement("article");
              el.innerHTML = `
                <img src="${item.cities[0].imageUrl1}" alt="${item.cities[0].name}">
                <h3>${item.name}</h3>
                <h3>${item.cities[0].name}</h3>
                <p>${item.cities[0].description}</p>
                <a href="#" class="btn btn-success btn-outline">Visit</a>`;
              shell.appendChild(el);
              
            });
          } else {
            alert("Enter a valid keyword to begin");
          }
        } catch (error) {
          console.error('Error processing data:', error);
          alert('An error occurred while processing your request. Please try again.');
        }
      } else {
        alert("Enter a keyword to begin");
      }
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again later.');
  });

  function reset(){ //reseting form
    document.getElementById("reset-btn").addEventListener("click",()=>{
      document.getElementById("search").innerHTML=""
    })
  }