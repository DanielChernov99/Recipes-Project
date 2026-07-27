const express = require("express");
const validateRecipe = require("../middleware/validateRecipe.js");
const validateRecipeUpdate = require("../middleware/validateRecipeUpdate.js");

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
router.post("/", validateRecipe, addRecipe);
router.patch("/:id", validateRecipeUpdate, updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
