const prisma = require("../prisma/prismaClient");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

// GET show all messages
exports.messagesGet = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      include: {
        user: true,
      },
      orderBy: {
        timeStamp: "desc",
      },
    });

    // testing
    const testUser = await prisma.user.findUnique({
      where: { id: 1 }, // or whatever your user ID is
    });
    console.log("Direct query result:", testUser);

    res.render("messages", { messages });
  } catch (error) {
    console.error(error);
    res.render("messages", { messages: [], error: "Error loading messages" });
  }
};

// POST delete a message (admin only)
exports.deletePost = async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);

    // find the message based on the id and delete it
    await prisma.message.delete({
      where: { id: messageId },
    });

    // redirect to the messages after deleting
    res.redirect("/messages");
  } catch (error) {
    console.error(error);
    res.redirect("/messages");
  }
};
