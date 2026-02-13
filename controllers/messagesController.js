const prisma = require("../prisma/prismaClient");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// GET to display all messages
exports.messagesGet = (req, res) => {
  res.send("message appear here");
};

// GET create a new message
exports.messagesNewGet = (req, res) => {
  res.render("new-message");
};

// POST create a new message
exports.messagesNewPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        title: title,
        text: text,
        userId: req.user.id,
      },
    });
    res.redirect("/messages");
  } catch (error) {
    console.error(error);
    res.render("new-message", { error: "Error creating this message" });
  }
};
