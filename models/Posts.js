var db = require('../config/database');
const PostModel = {};


PostModel.create = (title, description, photopath, thumbnail, fk_userId) => 
{
    let baseSQL = 'INSERT INTO photo (title, description, photo_path, thumbnail_path, fk_user_id) VALUE(?,?,?,?,?);';
        return db.execute(baseSQL, [title, description, photopath, thumbnail, fk_userId])
        .then( ([results, fields]) => 
        {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch( (err) => Promise.reject(err));
};

PostModel.search = (searchTerm) => 
{
    let baseSQL = "SELECT photo_id, title, description, thumbnail_path, concat_ws(' ', title, description) AS haystack FROM photo HAVING haystack like ?;";
    let sqlReadySearchTerm = "%"+searchTerm+"%";
    return db.execute(baseSQL, [sqlReadySearchTerm])
    .then(([results, fields]) => 
    {
        return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
}

PostModel.getNRecentPosts = (numberOfPost) => 
{
    let baseSQL = `SELECT photo_id, title, description, thumbnail_path, date_created FROM photo ORDER BY date_created DESC LIMIT ${numberOfPost}`
    return db.execute( baseSQL, []).then( ([results, fields]) => 
    {
        return Promise.resolve(results);
    })
    .catch( (err) => Promise.reject(err));
};

PostModel.getPostById = (postId) => 
{
    let baseSQL =
    "SELECT u.username, p.title, p.description, p.photo_path, p.date_created  FROM users u JOIN posts p ON u.user_id = fk_user_id WHERE p.photo_id = ?;";

    return db.execute(baseSQL, [postId])
    .then( ( [results, fields]) =>
    {
        return Promise.resolve(results);
    })
    .catch(err => Promise.reject(err))
}


module.exports = PostModel;