let form = document.getElementById("form");
let container = document.querySelector(".container");

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  const name = dataObject.type;

  // Check if user selected a valid option
  if (name === "select") {
    alert("Please select a character!");
    return;
  }

  apiCall(name);
  form.reset();
}

// Function to make API call
function apiCall(name) {
  const url = `https://rickandmortyapi.com/api/character/?name=${name}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Pass the results to display function
      displayCharacterToUser(data.results);
    })
    .catch((error) => {
      console.error("Error:", error);
      container.innerHTML =
        "<p style='text-align: center; color: white;'>Oops! Something went wrong. Please try again.</p>";
    });
}

// Function to display characters on the page
function displayCharacterToUser(characters) {
  container.innerHTML = ""; // Clear previous results

  if (!characters || characters.length === 0) {
    container.innerHTML =
      "<p style='text-align: center; color: white;'>No characters found!</p>";
    return;
  }

  // Loop through each character and create a card
  characters.forEach((character) => {
    let card = document.createElement("div");
    card.className = "card";

    let statusClass = character.status.toLowerCase();

    card.innerHTML = `
          <img src="${character.image}" alt="${character.name}">
          <div class="card-content">
            <p><strong>Name:</strong> ${character.name}</p>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Origin:</strong> ${character.origin.name}</p>
            <p><strong>Location:</strong> ${character.location.name}</p>
            <span class="status ${statusClass}">Status: ${character.status}</span>
          </div>
        `;

    container.appendChild(card);
  });
}
