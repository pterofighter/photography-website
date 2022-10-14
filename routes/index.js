var express = require('express');
var router = express.Router();
const {getRecentPosts, getPostById} = require('../middleware/postsmiddleware');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  // imageList = []
  // imageList.push({src: "images/photos/SAM_0394.JPG", name: "what"})
  // imageList.push({src: "images/photos/SAM_0394.JPG", name: "how"})
  // res.render('homepage', {imageList: imageList} );
  res.render('homepage', {name: "Damon's website"});
});

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.get('/postImage', function(req, res, next) {
  res.render('postimage')
});

router.get('/registration', function(req, res, next) {
  res.render('registration')
})

router.get('/post/:id(\\d+)', getPostById,(req, res, next) => //semicolon matches everything after it so basically everything after the 2nd /
{
  res.render('imagepost', {title: `Post ${req.params.id}`});
});

module.exports = router;
