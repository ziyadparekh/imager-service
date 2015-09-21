'use strict';

/**
 * USERS model
 * @type {exports}
 */
var connection = require('../helpers/connection');
var mysql = require('mysql');

var async = require('async');
var _ = require('underscore');

exports.insert = function (post, done, next) {
    var insert = {}
    _.each(post, function (image, i) {
        insert["image_" + (i + 1)] = image;
    });

    connection.query("INSERT INTO closet_items SET ? ", insert, function (err, rows) {
        if(err)
            console.log(err);
        return done(null, rows);
    }, next);
};