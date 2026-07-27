const recipeSchema = require("../schemas/recipeSchema.js");

const updateRecipeSchema = recipeSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

function validateRecipeUpdate(req, res, next) {
  try {
    req.body = updateRecipeSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validateRecipeUpdate;
