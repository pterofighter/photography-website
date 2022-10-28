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
    if (req.session.userId) {
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
            //the substring for fileuploaded and destination of thumbnail is for stripping the public/ to display the images
            //cause having that public/ at the start won't display the images for some reason
            return PostModel.create(
                title, description, fileUploaded.substring(6), destinationOfThumbnail.substring(6), fk_userId
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
                req.flash('error', err);
            //     res.status(err.getStatus());
            //     res.redirect(err.getRedirectURL());
            // }
            // else 
            // {
            //     next(err);
            // }
        })
    }
    else {
        console.log("not logged in");
        req.flash('error', "you are not logged in");
    }
    
    
}); 

//to access this search you would enter this in the url
//localhost:3000/posts/search?search=value
router.get('/search', async (req, res, next) => 
{
    try
    {
        let searchTerm = req.query.search;
        if(!searchTerm)
        {
            res.send(
            {
                resultsStatus: "info",
                message: "No search term given",
                results: []
            });
        }
        else 
        {
            //sql code to search from posts with any field with the ? we give it
            let results = await PostModel.search(searchTerm);
        
            if(results.length)
            {
                res.send(
                {
                    resultsStatus: "info",
                    message: `${results.length} results found`,
                    results: results
                });
            }
            else 
            {
                let results = await PostModel.getNRecentPosts(9)
                res.send(
                {
                    resultsStatus: "info", 
                    message: `No results where found for your search: ${searchTerm}, but here are the 8 most recent posts`,
                    results: results
                });
            }
        }
    }
    catch(err)
    {
        next(err);
    }
});



module.exports = router;