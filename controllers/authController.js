const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

// GET sign up on sign up page
exports.signupGet = (req, res) => {
  res.render("signup");
};

exports.signupPost = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // inserting into db
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: hashedPassword,
        membershipStatus: false, // default value,
        // might need to change this to true in the future since
        // they are signing up
      },
    });
    // TODO: Change this to redirect to the login page
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("signup", { error: "Error creating account" });
  }
};
