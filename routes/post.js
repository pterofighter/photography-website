var express = require('express');
var router = express.Router();

var sharp = require('sharp');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/photos");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        cb(null, file.fieldname + "." + fileExt)
    }
})

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("postImg"),(req, res, next) => {
    console.log("AHHHHHHHHHHHHHHHH!")
    console.log(req);
    res.send('');
}); 




module.exports = router;