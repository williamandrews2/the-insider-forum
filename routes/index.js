const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

// GET homepage
indexRouter.get("/", indexController.homepageGet);

// GET "feature under construction" page
indexRouter.get("/construction", indexController.constructionGet);

module.exports = indexRouter;
