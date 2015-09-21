"use strict";

var _ = require("underscore"),
    config = require("../configs/imager-config"),
    Uploader = require("s3-uploader"),
    async = require("async");

exports.validate = function (req, res, next) {
    var valid = true;
    if (!req.files || req.files.length === 0) {
        return res.status(403).send('expect 1 file upload named file1').end();
    }
    _.each(req.files, function (file) {
        if (!/^image\/(jpe?g|png|gif)$/i.test(file.mimetype)) {
            valid = false;
        }
    });
    if (!valid) {
        return res.status(403).send('expect image file').end();
    }
    next();
};

exports.upload = function (req, res, next) {
    var client = new Uploader('closet-co', config),
        files = req.files;

    if (Array.isArray(files)) {
        async.mapSeries(files, function(file, callback) {
            console.log("Processing file " + file.path);
            client.upload(file.path, {}, function (err, versions, meta) {
                if (err) return callback(err);
                callback(null, versions);
            });
        }, function (err, result) {
            if (err) res.status(403).json({"message" : "you fucked up"});
            else {
                req.images = result;
                next();
            }
        });
    }
    else {
        // dropzone will send multiple requests per default
        res.status(403).json({"message" : "need an array got object"});
    }
};

exports.format = function (req, res, next) {
    var images = req.images;
    var response = {};
    if (Array.isArray(images)) {
        _.each(images, function (image, i) {
            var obj = {};
            _.each(image, function (version) {
                if (version.identifier)
                    obj[version.identifier] = version.url;
            });
            response["image_" + (i + 1)] = obj;
        });
        req.formatted_images = response;
        next();
    } else {
        res.status(403).json({"message" : "need an array got object"});
    }
};
