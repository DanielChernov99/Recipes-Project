const express = require("express");
const recipeRouter = require("./routes/recipeRouter.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/recipes", recipeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
