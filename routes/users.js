var express = require('express');
const UserModel = require('../models/Users');
const {body, validationResult} = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.post('/register', 
[body('username').isLength({min:1}), body('password').isLength({min:8})],
(req, res, next) => {
  console.log("its function calling time!");
  let username = req.body.username;
  let password = req.body.password;

  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    console.log("oh no back to the errors again");
    return res.status(400).json({errors: errors.array()});
  }

  console.log("its creatin time!")
  UserModel.usernameExists(username)
  .then( (userDoesNameExist) => {
    if(userDoesNameExist) {
      throw "user already exist"
    }
    else{
      console.log("oh yeah passed the username test time to create")
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

module.exports = router;
