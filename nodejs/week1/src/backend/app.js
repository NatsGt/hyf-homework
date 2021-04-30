const express = require("express");
const app = express();

// import data here
const meals = require("./data/meals");
const reviews = require("./data/reviews");
const reservations = require("./data/reservations");

function joinMealReview() {
  meals.forEach(meal => {
    const reviewsOfMeal = reviews.filter(review => review.mealId === meal.id);
    meal.reviews = reviewsOfMeal
  });
  return meals;
}

const mealReview = joinMealReview();

// this is where you will be adding your routes
app.get("/", async (request, response) => {
  response.send("Meal Sharing Web App");
  console.log("test")
});

app.get("/meals", (req, res) => {
  res.send(mealReview);
});

app.get("/cheap-meals", (req, res) => {
  const cheapMeal = mealReview.filter(meal => meal.price <= 40);
  res.send(cheapMeal)
});

app.get("/large-meals", (req, res) => {
  const largeMeals = mealReview.filter(meal => meal.maxNumberOfGuests > 5);
  res.send(largeMeals)
});

app.get("/meal", (req, res) => {
  const randomIndex = Math.floor(Math.random() * mealReview.length);
  const meal = mealReview[randomIndex];
  res.send(meal);
})

app.get("/reservations", (req, res) => {
  res.send(reservations)
})

app.get("/reservation", (req, res) => {
  const randomIndex = Math.floor(Math.random() * reservations.length);
  const reservation = reservations[randomIndex];
  res.send(reservation)
})

module.exports = app;
