var multer = require("multer");
var upload = multer();

let {
  User,
  userIsRegistreted,
  findUserByEmail,
  getProducts,
  addBonusToUser,
  validUserPassword
} = require("./storage/storage");


module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index.pug");
  });

  app.get("/signin", (req, res) => {
      res.render("signin.pug")
  })

  app.post("/signin", upload.array(), (req, res) => {
      let {email, password} = req.body;
      if (userIsRegistreted(email)) {
          if(validUserPassword(email, password)){
            res.json({ status: "signin" });
          } else {
            res.json({ status: "pass_error" });
          }
      } else {
        res.json({ status: "unregistrated" });
      }

  })

  app.post("/signup", upload.array(), (req, res) => {
    let { email, password } = req.body;
    if (!userIsRegistreted(email)) {
      let user = new User(email);
      user.setPassword(password);
      user.addPoints(100);
      user.saveToStorage();
      res.json({ status: "signup" });
    } else {
      res.json({ status: "error" });
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
    let bonus = addBonusToUser(req.query.email, req.query.id);
    res.json({ msg: "Your bonus: ", bonus: bonus });
  });
};
