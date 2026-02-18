const { Router } = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// GET all messages
messagesRouter.get("/", messagesController.messagesGet);

// GET create a new message
messagesRouter.get("/new", isAuthenticated, messagesController.messagesNewGet);

// POST create a new message
messagesRouter.post("/", isAuthenticated, messagesController.messagesNewPost);

// POST delete a message (admin only)
messagesRouter.post("/:id/delete", isAdmin, messagesController.deletePost);

module.exports = messagesRouter;
