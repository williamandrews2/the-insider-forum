const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

// GET sign up
authRouter.get("/signup", authController.signupGet);

// POST sign up
authRouter.post("/signup", authController.signupPost);

module.exports = authRouter;
