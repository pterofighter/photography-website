var express = require('express');
const UserModel = require('../models/Users');
const {body, validationResult} = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.post('/register', 
[body('username').isLength({min:1}), body('password').isLength({min:8})],
(req, res, next) => {
  console.log("registrating user");
  let username = req.body.username;
  let password = req.body.password;

  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors: errors.array()});
  }

  UserModel.usernameExists(username)
  .then( (userDoesNameExist) => {
    if(userDoesNameExist) {
      throw "user already exist"
    }
    else{
      return UserModel.create(username, password);
    }
  })
  .then( (createdUserId) => {
    if(createdUserId < 0) {
      throw "something went wrong when trying to create"
    }
    else {
      res.redirect('homepage')
    }
  })
  .catch((err) => {
    console.log("an error happened when trying to create a user");
    console.log(err);
    next(err);
  })
});

router.post('/login', 
[body('username').isLength({min:1}), body('password').isLength({min:8})],
(req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  UserModel.authenticate(username, password)
  .then( (loggedUserId) => {
    if (loggedUserId > 0) {
      req.session.username = username;
      req.session.userId = loggedUserId;
      res.redirect("/")
    }
    else {
      throw "something went wrong when logging in"
    }
  })
  .catch((err) => {
    console.log("an error occured when trying to log in");
    console.log(err);
    next(err);
  })
});


module.exports = router;
