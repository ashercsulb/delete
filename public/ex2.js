// Traveler Information
const travelInfo = {
  name: "Asher",
  countries: [
    {
      name: "Jamaica",
      year: 2018
    },
    {
      name: "Canada",
      year: 2019
    },
    {
      name: "Australia",
      year: 2019
    },
    {
      name: "Mexico",
      year: 2017
    }
  ]
};

// Function to display result
const displayResult = () => {

// Send travel data to the server in JSO format
  fetch("/api/countries", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(travelInfo)
  })
    .then(response => response.text())
    .then(result => {
      //console.log(result) // for testing
      // Get output element and display result
      const divOutput = document.getElementById("output");
      divOutput.textContent = result;
    })
    .catch(err => {
      // console.error(err.message); // for testing
      // Will output error to HTML page (not part of the requirement)
      const divOutput = document.getElementById("output");
      divOutput.textContent = err.message;
    });
};

// Add an event lister to the button click
const btnElement = document.getElementById("callapi");
btnElement.addEventListener("click", displayResult);