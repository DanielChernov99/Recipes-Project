const recipeModel = require("../models/recipeModel.js");

async function getRecipes(req, res) {
  const recipes = await recipeModel.getRecipes(req.query);

  res.status(200).json({
    error: false,
    data: recipes,
  });
}

async function getRecipeById(req, res) {
  const recipe = await recipeModel.getRecipeById(req.params.id);

  recipe
    ? res.status(200).json({
        error: false,
        data: recipe,
      })
    : res.status(404).json({
        error: true,
        message: "Unknown recipe id",
        statusCode: 404,
      });
}

async function addRecipe(req, res) {
  const newRecipe = await recipeModel.addRecipe(req.body);

  res.status(201).json({
    error: false,
    data: newRecipe,
  });
}

async function updateRecipe(req, res) {
  const updatedRecipe = await recipeModel.updateRecipe(req.params.id, req.body);

  updatedRecipe
    ? res.status(200).json({
        error: false,
        data: updatedRecipe,
      })
    : res.status(404).json({
        error: true,
        message: "Recipe not found",
        statusCode: 404,
      });
}

async function deleteRecipe(req, res) {
  const deleted = await recipeModel.deleteRecipe(req.params.id);

  deleted
    ? res.status(204).send()
    : res.status(404).json({
        error: true,
        message: "Recipe not found",
        statusCode: 404,
      });
}

async function getStats(req, res) {
  const stats = await recipeModel.getStats();

  res.status(200).json({
    error: false,
    data: stats,
  });
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStats,
};
