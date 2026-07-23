const express = require("express");

const {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStats,
} = require("../controllers/recipeController.js");

const router = express.Router();

router.get("/", getRecipes);
router.get("/stats", getStats);
router.get("/:id", getRecipeById);
router.post("/", addRecipe);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
