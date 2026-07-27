const recipeModel = require("../models/recipeModel.js");

async function getRecipes(req, res, next) {
  try {
    const recipes = await recipeModel.getRecipes(req.query);

    res.status(200).json({
      error: false,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
}

async function getRecipeById(req, res, next) {
  try {
    const recipe = await recipeModel.getRecipeById(req.params.id);

    if (!recipe) {
      const error = new Error("Recipe not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      error: false,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

async function addRecipe(req, res, next) {
  try {
    const newRecipe = await recipeModel.addRecipe(req.body);

    res.status(201).json({
      error: false,
      data: newRecipe,
    });
  } catch (error) {
    next(error);
  }
}

async function updateRecipe(req, res, next) {
  try {
    const updatedRecipe = await recipeModel.updateRecipe(
      req.params.id,
      req.body,
    );

    if (!updatedRecipe) {
      const error = new Error("Recipe not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      error: false,
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const deleted = await recipeModel.deleteRecipe(req.params.id);

    if (!deleted) {
      const error = new Error("Recipe not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function getStats(req, res, next) {
  try {
    const stats = await recipeModel.getStats();

    res.status(200).json({
      error: false,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStats,
};
