var express = require('express');
var router = express.Router();

var sharp = require('sharp');
var multer = require('multer');

router.post('/createPost', (req, res, next) => {
    console.log(req);
    res.send('');
}); 