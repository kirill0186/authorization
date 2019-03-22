let {User, userIsRegistreted} = require("./storage/storage");

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.render("index.pug");
  });

  app.post("/signup", (req, res) => {
    let {email, password} = req.body;
    console.log(email, password);
    if (!userIsRegistreted(email)){
        let user = new User(email, password);
        user.addPoints(100);
        user.saveToStorage();
    }else{
        console.log("exist");
    }

    // console.log(user.validPassword("1234"));
    res.redirect("/");
  })

};