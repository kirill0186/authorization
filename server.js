const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const session = require("express-session");
const fs = require("fs");
const https = require("https");


let privateKey = fs.readFileSync("sslcert/server.key", "utf8");
let certificate = fs.readFileSync("sslcert/server.crt", "utf8");
let credentials = { key: privateKey, cert: certificate };

app.use(express.static(__dirname + "/public/"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

// app.use(
//   session({ secret: "somesecret", resave: true, saveUninitialized: true })
// );

require("./routes.js")(app);


const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, err => {
  if (err) throw err;
  else console.log("Running server at port " + port);
});
