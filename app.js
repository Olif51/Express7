require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5002;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);



const movieHandlers = require("./movieHandlers");
const { validateMovie , validateUser } = require("./validators");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

const userHandlers = require("./userHandlers");

const { hashPassword } = require("./auth.js");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", validateUser, hashPassword, userHandlers.postUser);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.delete("/api/users/:id", userHandlers.deleteUser);