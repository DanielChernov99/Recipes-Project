const express = require("express");
const recipeRouter = require("./routes/recipeRouter.js");
const errorHandler = require("./middleware/errorHandler.js");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

const app = express();

morgan.token("timestamp", () => new Date().toISOString());

app.use(morgan(":timestamp :method :url :status :response-time ms"));

app.use(express.json());

app.use("/api/recipes", recipeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
