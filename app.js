const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const prisma = require("./prisma/prismaClient");
const bcrypt = require("bcryptjs");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// port variable
const PORT = process.env.PORT || 3030;

// locals object used to make the user variable
// available to all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// route variables
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
// const messagesRouter = require("./routes/messages");

app.use("/", indexRouter);
app.use("/", authRouter);
// app.use("/messages", messagesRouter);

// starting the server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}`);
});

// setting up Passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // search for the user in the db
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      // check username
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // check password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
