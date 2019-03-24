let {User, userIsRegistreted, clearStorage, findUserByEmail} = require("./storage/storage");

clearStorage();

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
        res.redirect(`/profile/${email}`);
    }else{
        console.log("exist");
        res.redirect("/");
    }
  })

  app.get("/profile/:email", (req, res) => {
    console.log("EMAIL: "+req.params.email); 
    let user = findUserByEmail(req.params.email);  
    console.log(user);  
    res.render("profile.pug", {email: user.email, points: user.points});
  })
};