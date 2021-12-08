const db = require("../models");
const User = db.users;

// Create and Save a user
exports.signUp= async (req, res) => {
  // Validate request
  if (!req.body.email && !req.body.password) {
        res.status(400).send({ message: "Please provide email and password to continue." });
        return;
}
try {
const filter = { email: req.body.email };
let data = await User.findOne(filter);

if(data === null) {
//If not found , Create a User
const user = new User({
    userid: req.body.userid,
    email: req.body.email,
    first_name: req.body.first_name, 
    last_name: req.body.last_name,
    username: req.body.username,
    contact: req.body.contact,
    password: req.body.password,
    role: req.body.role ? req.body.role : 'user',
    isLoggedIn: true,
    uuid: req.body.uuid,
    accesstoken: req.body.accesstoken, 
    coupens: req.body.coupens,
    bookingRequests: req.body.bookingRequest

});
try {
let userSaved = await user.save(user);
res.send(userSaved);
} catch(err) {
    res.status(500).send({
    message: err.message || "Some error occurred, please try again later."
    });
}
}
else {
//User found with same email
res.status(400).send({
    message: "User Already Exists."
});
}
} catch(err) {
    res.status(500).send({
    message: err.message || "Some error occurred, please try again later."
    });
} };


// Retrieve user using the username provided in the req parameter.
// Validate user by matching the password provided in the req parameter.
exports.login = async (req, res) => {
try {
  const username = req.body.username;
  const password = req.body.password;
  // Validate request
  if (!username && !password) {
    res.status(400).send({ message: "Please provide username and password to continue." });
    return;
  }
const filter = { username: username, password : password };
let user = await User.findOne(filter);

if(user === null) {
res.status(401).send({

    message: "Username or password not correct."
});
} else {
  if (user.isLoggedIn == true){
  res.status(400).send({message: "You are already Logged In"});
  return; 
  }
  user.isLoggedIn = true;
 

}
}catch(err) {
  res.status(500).send({
    message: err.message || "Some error occurred, please try again later."
    });
}
}; 



exports.logout = async (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(401).send({ message: "Please provide user credentials to logout." });
    return;
  }
  
try {
const id = req.body.id;
const update = { isLoggedIn: false };

let data = await User.findByIdAndUpdate(id, update);
res.send({ message: "Logged Out successfully." });
} catch(err) {
    res.status(404).send({
      message: "User Not Found - Logout failed."
    });
}
}; 

exports.getCouponCode = async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
    User.find({accesstoken: token}).then(function(user){
        if(user[0].coupens)
            res.send(user[0].coupens);
        else
            res.send([]);
    }); 
  };

    exports.bookShow = (req, res) => {
      const token = req.headers["x-access-token"] || req.headers["authorization"];
      User.find({accesstoken: token}).then(function(user){
          if(user[0].bookingRequests)
              res.send(user[0].bookingRequests);
          else
              res.send([]);
      }); 
    };