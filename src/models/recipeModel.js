const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const recipesPath = path.join(__dirname, "../data/recipes.json");

async function readRecipes() {
  const data = await fs.promises.readFile(recipesPath, "utf-8");
  return JSON.parse(data);
}

async function writeRecipes(recipes) {
  await fs.promises.writeFile(recipesPath, JSON.stringify(recipes, null, 2));
}

async function getRecipes(query = {}) {
  const { difficulty, maxCookingTime, search } = query;

  let recipes = await readRecipes();

  if (difficulty) {
    recipes = recipes.filter((r) => {
      return r.difficulty === difficulty;
    });
  }

  if (maxCookingTime) {
    const maxTime = Number(maxCookingTime);

    recipes = recipes.filter((r) => {
      return r.cookingTime <= maxTime;
    });
  }

  if (search) {
    const searchValue = search.toLowerCase();

    recipes = recipes.filter((r) => {
      return (
        r.title.toLowerCase().includes(searchValue) ||
        r.description.toLowerCase().includes(searchValue)
      );
    });
  }

  return recipes;
}

async function getRecipeById(id) {}

async function addRecipe(recipeData) {}

async function updateRecipe(id, data) {}

async function deleteRecipe(id) {}

async function getStats() {}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStats,
};
