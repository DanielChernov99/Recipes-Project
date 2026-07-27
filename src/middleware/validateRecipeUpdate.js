const recipeSchema = require("../schemas/recipeSchema.js");

const updateRecipeSchema = recipeSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

function validateRecipeUpdate(req, res, next) {
  const result = updateRecipeSchema.safeParse(req.body);

  if (!result.success) {
    const validationErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      error: true,
      message: "Recipe validation failed",
      statusCode: 400,
      details: validationErrors,
    });
  }

  req.body = result.data;
  next();
}

module.exports = validateRecipeUpdate;
