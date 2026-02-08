const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Express is running!");
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express listening on port ${PORT}`);
});
