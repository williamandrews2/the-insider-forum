// TODO import db here

// GET homepage
exports.homepageGet = (req, res) => {
  (res.render("index"), { user: req.user });
};

// GET function to render the "feature under construction" page
exports.constructionGet = (req, res) => {
  res.render("construction");
};
