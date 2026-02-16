const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
const { authenticate } = require("passport");

// GET sign up
authRouter.get("/signup", authController.signupGet);

// POST sign up
authRouter.post("/signup", authController.signupPost);

// GET login
authRouter.get("/login", authController.loginGet);

// POST login
authRouter.post("/login", authController.loginPost);

// GET logout
authRouter.get("/logout", authController.logoutGet);

// GET join club (membership)
authRouter.get("/join", isAuthenticated, authController.joinClubGet);

// POST join club
authRouter.post("/join", isAuthenticated, authController.joinClubPost);

module.exports = authRouter;
