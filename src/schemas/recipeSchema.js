const { z } = require("zod");

const recipeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters")
    .max(100, "Title cannot contain more than 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .max(500, "Description cannot contain more than 500 characters"),

  ingredients: z
    .array(z.string().trim().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),

  instructions: z
    .array(z.string().trim().min(1, "Instruction cannot be empty"))
    .min(1, "At least one instruction is required"),

  cookingTime: z.number().positive("Cooking time must be a positive number"),

  servings: z
    .number()
    .int("Servings must be an integer")
    .positive("Servings must be a positive number"),

  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Difficulty must be easy, medium, or hard",
  }),

  rating: z
    .number()
    .min(0, "Rating cannot be lower than 0")
    .max(5, "Rating cannot be higher than 5")
    .optional(),
});

module.exports = recipeSchema;
