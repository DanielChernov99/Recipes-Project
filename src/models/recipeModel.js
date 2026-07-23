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

async function getRecipeById(id) {
  let recipes = await readRecipes();
  const recipe = recipes.find((r) => r.id === id);
  return recipe;
}

async function addRecipe(recipeData) {
  let recipes = await readRecipes();
  const newRecipe = {
    ...recipeData,
    id: uuidv4(),
    rating: recipeData.rating ?? 0,
    createdAt: new Date().toISOString(),
  };
  recipes.push(newRecipe);
  await writeRecipes(recipes);

  return newRecipe;
}

async function updateRecipe(id, data) {
  const recipes = await readRecipes();

  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  if (recipeIndex === -1) {
    return null;
  }

  const currentRecipe = recipes[recipeIndex];

  const updatedRecipe = {
    ...currentRecipe,
    ...data,
    id: currentRecipe.id,
    createdAt: currentRecipe.createdAt,
  };

  recipes[recipeIndex] = updatedRecipe;

  await writeRecipes(recipes);

  return updatedRecipe;
}

async function deleteRecipe(id) {
  const recipes = await readRecipes();

  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  if (recipeIndex === -1) {
    return false;
  }

  recipes.splice(recipeIndex, 1);

  await writeRecipes(recipes);

  return true;
}

async function getStats() {}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStats,
};
