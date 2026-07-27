const { ZodError } = require("zod");

function errorHandler(error, req, res, next) {
  if (error instanceof ZodError) {
    const validationErrors = error.issues.map((issue) => ({
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

  const statusCode = error.statusCode || error.status || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    error: true,
    message:
      statusCode >= 500
        ? "Internal server error"
        : error.message || "Request failed",
    statusCode,
  });
}

module.exports = errorHandler;
