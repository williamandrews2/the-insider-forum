const { Router } = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");
const { isAuthenticated } = require("../middleware/auth");

// GET all messages
messagesRouter.get("/", messagesController.messagesGet);

// GET create a new message
messagesRouter.get("/new", isAuthenticated, messagesController.messagesNewGet);

// POST create a new message
messagesRouter.post("/", isAuthenticated, messagesController.messagesNewPost);

module.exports = messagesRouter;
