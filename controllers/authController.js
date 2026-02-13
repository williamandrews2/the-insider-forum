const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// GET sign up on sign up page
exports.signupGet = (req, res) => {
  res.render("signup");
};

exports.signupPost = async (req, res) => {
  try {
    const { firstName, lastName, username, password, confirmPassword } =
      req.body;

    // validation
    const errors = [];

    const usernameCheck = await prisma.user.findUnique({
      where: { username: username },
    });

    if (usernameCheck) {
      errors.push("That username is taken! Please try another username");
    }

    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      errors.push("All fields are required");
    }

    if (password !== confirmPassword) {
      errors.push("The passwords do not match");
    }

    if (password && password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    // re-render the form prefilled
    if (errors.length > 0) {
      return res.render("signup", {
        errors,
        firstName,
        lastName,
        username,
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // inserting into db
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: hashedPassword,
        membershipStatus: false,
      },
    });
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("signup", { error: "Error creating account" });
  }
};

// GET login the user
exports.loginGet = async (req, res) => {
  res.render("login");
};

// POST login the user
exports.loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

// GET logout the user
exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// GET to join the club (membership)
exports.joinClubGet = (req, res) => {
  res.redirect("/construction");
};
