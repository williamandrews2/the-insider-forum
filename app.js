const express = require("express");
const app = express();
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// port variables
const PORT = process.env.PORT || 3030;

// home route
app.get("/", (req, res) => {
  res.send("Express is running!");
});

// route variables
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const messagesRouter = require("./routes/messages");

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/messages", messagesRouter);

// starting the server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express listening on port ${PORT}`);
});
