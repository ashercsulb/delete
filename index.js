// Load the Express and Multer packages as a module
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

// Access the exported service
const app = express();
const upload = multer();
const jsonParser = bodyParser.json();

// Serve content of the "public and css" subfolder directly
app.use(express.static("public"));
app.use(express.static("css"));


// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Start listening to incoming requests
// If process.env.PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// Return the index.html file for requests to the root URL ("/")
app.get("/", (request, response) => {
  //response.send("Hello this is a test  from Express!");
  response.sendFile(`${__dirname}/views/index.html`);
});

// Exercise 1 - Get
app.get("/ex1", (request, response) => {
  //response.send("Hello this is a test  from Express!");
  response.sendFile(`${__dirname}/views/ex1.html`);
});

// Exercise 1 - Post
// Handle form data submission to the "/ex1" route
app.post("/ex1", upload.array(), (request, response) => {
  // console.log(request.body);  // For testing
  response.send(`${request.body.name}, Thank you for your order.  We will keep you posted on delivery status at ${request.body.email}.`);
});


// Exercise 2 - Get
app.get("/ex2", (request, response) => {
  response.sendFile(`${__dirname}/views/ex2.html`);
});

// Exercise 2 - Post (api/countries)
// Handle form data submission to the "/ex2" route
app.post("/api/countries", jsonParser, (request, response) => {
  // console.log(request.body); // For testing
  response.send(`Your name is ${request.body.name} and you visited ${request.body.countries.length} countries.  Keep traveling!`);
});

// Exercise 3 - Articles Array (I pre-populated it with dummy data, not required)
const articles = [
  {
    id: 1,
    title: "First Article",
    content: "This is a test"
  },
  {
    id: 2,
    title: "Article 2",
    content: "More information here"
  },
  {
    id: 4,
    title: "Any title",
    content: "Some content"
  }
];

// Function to get max id in the array
const getMaxId = (articles) => articles.reduce((max, val) => (max > val) ? max : val, -9);

// Exercise 3 - Get
app.get("/ex3", (request, response) => {
  response.sendFile(`${__dirname}/views/ex3.html`);
});

// Exercise 3 - Post (/articles)
// Handle form data submission to the "/ex2" route
app.post("/articles", upload.array(), (request, response) => {
  // console.log(request.body); // For testing
  // Get next article id (get max id and add one)
  const nextId = getMaxId(articles.map(article => article.id)) + 1;
  // Can perform above without a function (see below)
  //const nextId = articles.map(article => article.id).reduce((max, val) => max > val ? max : val, -0);

  // console.log("max id is: ", maxId); // For teting
  // Add article to array
  articles.push(
    {
      id: nextId,
      title: request.body.title,
      content: request.body.content
    }
  );
    // Return message 
  response.send(`New article added successfully with title "${request.body.title}" and ID ${nextId}!`);
});