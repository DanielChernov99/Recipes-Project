const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const recipesPath = path.join(__dirname, "../data/recipes.json");

async function readRecipes() {
  const data = await fs.promises.readFile(recipesPath, "utf-8");
  return JSON.parse(data);
}

async function wrtieRecipes(recipes) {
  await fs.promises.writeFile(recipesPath, JSON.stringify(recipes, null, 2));
}

async function getRecipes(query = {}) {}

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
