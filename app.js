//npm install
//Jak by sie cos jebalo
//npm install nodemon -g
//npm install --save-dev cross-env

//Zaczynac serwer w developmencie przez komende npm run dev
//Zaczynac serwer w produkcji przez komende npm run production

const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const logger = require("morgan");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

//Load env file
require("dotenv").config({ path: "./config/.env" });

//Connect to db
connectDB();

//Passport config
require('./config/passport')(passport)

//Initialize express
var app = express();

//Logger middleware
app.use(logger("dev"));
app.use(express.json());

// bodyparser middleware
app.use(express.urlencoded({ extended: false }));

//Session configuration
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);


//Flash errors middleware
app.use(flash());

//View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static files middleware
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'))

//Routes
var indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(process.env.PORT, function () {
  console.log(
    `App is running in ${process.env.Node_ENV} mode on port ${process.env.PORT}`
  );
});
