"use strict";

var express = require("express"),
    morgan = require("morgan"),
    multer = require("multer"),
    async = require("async"),
    utils = require("../modules/utils"),
    router = express.Router(),
    upload;

upload = multer({ dest: "uploads/"});

router.post('/', upload.array("image", 5), utils.validate, utils.upload, utils.format, function (req, res) {
    if (req.formatted_images) {
        res.status(200).json(req.formatted_images);
    } else {
        res.status(403).json({"message": "you fucked up"});
    }
});


router.get('/', function (req, res) {
    res.send('<html>' +
        '<body>' +
        '<form action="/api" method="post" enctype="multipart/form-data">' +
        'Choose a file to upload <input type="file" name="image" multiple/>' +
        '<input type="submit" value="upload" />' +
        '</form>' +
        '</body>' +
        '</html>')
});

module.exports = router;