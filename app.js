const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// port variables
const PORT = process.env.PORT || 3030;

// route variables
const indexRouter = require("./routes/index");
// TODO: add these back in as components are created
// const authRouter = require("./routes/auth");
// const messagesRouter = require("./routes/messages");

app.use("/", indexRouter);
// TODO: add these back in as components are created
// app.use("/", authRouter);
// app.use("/messages", messagesRouter);

// starting the server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}`);
});
