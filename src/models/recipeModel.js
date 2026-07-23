const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const recipesPath = path.join(__dirname, "../data/recipes.json");

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
