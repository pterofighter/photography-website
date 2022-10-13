var express = require('express');
var router = express.Router();
var PostModel = require('../models/Posts');

var sharp = require('sharp');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/photos");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "." + fileExt)
    }
})

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("postImg"),(req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/thumbnails/" + fileAsThumbnail;
    let title = req.body.postTitle;
    let description = req.body.postDesc; 
    let fk_userId = req.session.userId;
    sharp(fileUploaded)
    .resize(200) 
    .toFile(destinationOfThumbnail)
    .then(() => 
    {
        return PostModel.create(
            title, description, fileUploaded, destinationOfThumbnail, fk_userId
        );
    })
    .then((postWasCreated) => 
    {
        if(postWasCreated)
        {
            // req.flash('success', "Your post was created successfully!");
            res.redirect('/');
        }
        else 
        {
            throw "post could not be created"
            // throw new PostError('Post could not be created!', '/postImage', 200);
            
        }
    })
    .catch((err) => 
    {
        console.log(err);
        // if(err instanceof PostError)
        // {
        //     errorPrint(err.getMessage());
        //     req.flash('error', err.getMessage());
        //     res.status(err.getStatus());
        //     res.redirect(err.getRedirectURL());
        // }
        // else 
        // {
        //     next(err);
        // }
    })
    
}); 




module.exports = router;