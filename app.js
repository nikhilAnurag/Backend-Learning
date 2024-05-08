//import the path module as to work with files and path directory and to use path.join([..paths]) method
const path = require("path");

//import the express module to create the express application
const express = require("express");

//import the body-parser as to parse the urlencoder body parsing
const bodyParser = require("body-parser");

//import session
const session = require('express-session');

//import mongodbSession
const MongoDBStore = require('connect-mongodb-session')(session)

//import the error  controller to handle request to invalid URL
const errorController = require("./controllers/error");

//import the mongoose 
const mongoose = require("mongoose");

const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

const MONGODB_URI = "mongodb://localhost:27017/test";

//initialize the express
const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions'
})

//set the view engine to ejs
app.set("view engine", "ejs");
// set the directory for the views
app.set("views", "views");


//import the adminRoutes to handle url for admin purposes
const adminRoutes = require("./routes/admin");
//import the shoproute to handle url for general purposes
const shopRoutes = require("./routes/shop");

const authRoutes = require('./routes/auth');

//urlencoded method is used to parse the urlencoded form data , it will extract the data
// from req.body and make it available in js object
// extented : false is set to use querystring library for parsing
app.use(bodyParser.urlencoded({ extended: false }));
// the static folder is use to avail the css files and images for the webpage;

// static is  a middleware and it serve the static files and based on the static -serve
app.use(express.static(path.join(__dirname, "public")));

app.use(session({secret:'my secret',resave:false,saveUninitialized:false,
store:store}));


app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      
      next();
    })
    .catch((err) => {
      console.log(err);
    });
  // next();
});

// use the admin middleware to path starting with the /admin path
app.use("/admin", adminRoutes);
//other will routes to the shopRoutes
app.use(shopRoutes);
app.use(authRoutes);

//The invalid url that path didn't match with either of two, errorController will handle it;
app.use(errorController.get404);

//start the server on the port 5000
// mongoConnect( ()=>{

//     app.listen(5000);
// })



mongoose
  .connect(
    "mongodb://localhost:27017/test"
  )
  .then(() => {
    User.findOne().then(user=>{
      if(!user){
        const user  = new User({
          name: 'Nikhil',
          email:'nik@gmail.com',
          cart:{
            items:[]
          }
        })
        user.save();
      }
    })
    console.log('Server up at port: 5000');
    app.listen(5000);
  })
  .catch((err) => {
    console.error(err);
  });

