var express = require('express');
var router = express.Router();

var sharp = require('sharp');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/photos")
    }
})

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("postImg"),(req, res, next) => {
    console.log(req);
    res.send('');
}); 




module.exports = router;