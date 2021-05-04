const express = require("express");
const router = express.Router();

const meals = require("./../data/meals.json");

router.get("/", async (request, response) => {
  let filteredMeals = meals;

  if ("maxPrice" in request.query) {
    const maxPrice = parseFloat(request.query.maxPrice);
    if (isNaN(maxPrice)) {
      response.status(400).send({ error: "Data type is not valid" })
      return
    } else {
      filteredMeals = filteredMeals.filter(meal => meal.price < maxPrice);
    }
  }
  if ("title" in request.query) {
    const title = request.query.title;
    filteredMeals = filteredMeals.filter(meal => meal.title.includes(title));
  }
  if ("createdAfter" in request.query) {
    const createdAfter = Date.parse(request.query.createdAfter);
    if (isNaN(createdAfter)) {
      response.status(400).send({ error: "Data type is not valid" })
      return
    } else {
      filteredMeals = filteredMeals.filter(meal => Date.parse(meal.createdAt) > createdAfter);
    }
  }
  if ("limit" in request.query) {
    const limit = request.query.limit;
    if (isNaN(limit)) {
      response.status(400).send({ error: "Data type is not valid" })
      return
    } else {
      filteredMeals = filteredMeals.slice(0, limit);
    }
  }
  try {
    response.send(filteredMeals)
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  const mealID = parseInt(request.params.id);
  if (isNaN(mealID)) {
    response.status(400).send({ error: "ID must be a number" });
    return
  }
  const mealsByID = meals.find(meal => meal.id === mealID);
  if (mealsByID) {
    response.send(mealsByID)
  } else {
    response.send({ error: "Id not found" })
  }
})

module.exports = router;
