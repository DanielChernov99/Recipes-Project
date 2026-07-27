const { ZodError } = require("zod");

function errorHandler(error, req, res, next) {
  if (error instanceof ZodError) {
    const validationErrors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      error: true,
      message: "Validation failed",
      statusCode: 400,
      details: validationErrors,
    });
  }

  const statusCode = error.statusCode || error.status || 500;

  res.status(statusCode).json({
    error: true,
    message: statusCode >= 500 ? "Internal server error" : error.message,
    statusCode,
  });
}

module.exports = errorHandler;
