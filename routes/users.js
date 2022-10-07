var express = require('express');
const UserModel = require('../models/Users');
const {body, validationResult} = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.get('/register', 
[body('username').isLength({min:1}), body('password').isLength({min:8})],
function(req, res, next) {
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
      res.direct('home')
    }
  })
  .catch((err) => {
    console.log("an error happened when trying to create a user");
    console.log(err);
    next(err);
  })


  res.send('respond with a resource');
});

module.exports = router;
