const recipeSchema = require("../schemas/recipeSchema.js");

function validateRecipe(req, res, next) {
  try {
    req.body = recipeSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validateRecipe;
