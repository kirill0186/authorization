let {
  User,
  userIsRegistreted,
  clearStorage,
  findUserByEmail,
  getProducts,
  addBonusToUser
} = require("./storage/storage");

// clearStorage();

module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index.pug");
  });

  app.post("/signup", (req, res) => {
    let { email, password } = req.body;
    console.log(email, password);
    if (!userIsRegistreted(email)) {
      let user = new User(email, password);
      user.addPoints(100);
      user.saveToStorage();
      res.redirect(`/profile/${email}`);
    } else {
      console.log("exist");
      res.redirect("/");
    }
  });

  app.get("/profile/:email", (req, res) => {
    let user = findUserByEmail(req.params.email);
    res.render("profile.pug", { email: user.email, points: user.points });
  });

  app.get("/products", (req, res) => {
    res.render("products.pug", {
      products: getProducts()
    });
  });

  app.get("/buy", (req, res) => {
    // console.log("redf "+req.query.id, req.query.email);
    addBonusToUser(req.query.email, req.query.id);
    res.redirect("/products");
  });
};
