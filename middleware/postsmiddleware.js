var db = require('../config/database');
const {getNRecentPosts, getPostById} = require('../models/Posts');
// const {getCommentsForPost} = require('../models/comments');
const postMiddleware = {};

postMiddleware.getRecentPosts = function(req, res, next)
{ 
    getNRecentPosts(12)
    .then( (results) => 
    {
        res.locals.results = results;
        if (results.length == 0)
        {
            console.log("no posts to show");
            // req.flash('error', 'There are no posts to show');
        }
        next();
    })
    .catch( (err) => next(err));
}

//maybe change it in the future to actually get all or something idk
postMiddleware.getAllPosts = function(req, res, next)
{ 
    getNRecentPosts(100)
    .then( (results) => 
    {
        res.locals.results = results;
        if (results.length == 0)
        {
            console.log("no posts to show");
            // req.flash('error', 'There are no posts to show');
        }
        next();
    })
    .catch( (err) => next(err));
}

postMiddleware.getPostById =  async function(req, res, next)
{
    try 
    {
        let postId = req.params.id;
        let results = await getPostById(postId);
        if (results && results.length)
        {
            res.locals.currentPost = results[0];
            next();
        }
        else
        {
            console.log("this is not the post you are looking for");
            // req.flash("error", "This is not the post you are looking for");
            res.redirect('/');
        }
    }
    catch (error) 
    {
        console.log(error);
        next(error);
    }
}

// postMiddleware.getCommentsByPostId = async function(req, res, next)
// {
//     let postId = req.params.id;
//     try 
//     {
//         let results = await getCommentsForPost(postId);
//         res.locals.currentPost.comments = results;
//         next();
//     }
//     catch (error)
//     {
//         next(error);
//     }
// }

module.exports = postMiddleware; 