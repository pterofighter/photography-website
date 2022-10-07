var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  imageList = []
  imageList.push({src: "images/photos/SAM_0394.JPG", name: "what"})
  imageList.push({src: "images/photos/SAM_0394.JPG", name: "how"})
  res.render('homepage', {imageList: imageList} );
});

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.get('/postImage', function(req, res, next) {
  res.render('postimage')
});

router.get('/registration', function(req, res, next) {
  res.render(registration)
})

module.exports = router;
