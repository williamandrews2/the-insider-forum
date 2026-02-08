const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

// GET homepage
indexRouter.get("/", indexController.homepageGet);

module.exports = indexRouter;
