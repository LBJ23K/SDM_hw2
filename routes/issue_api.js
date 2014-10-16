'use strict';

var express = require('express');

var config = require('../config/database.json');
var mysql = require('mysql');
var moment = require('moment');
var _ = require("underscore");
var connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: 'b00705031'
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected ');
});

exports.index = function(req, res) {

    connection.query('SELECT issue.*,user.username FROM `issue` ,`user` where issue.author = user.id', function(err, rows, fields) {
        if (err) throw err;
        _.each(rows, function(element, index, list) {
            var issue_id = element.id;
            connection.query('SELECT `author`,`content`,`createAt` FROM `comment` where issue_id = ' + issue_id, function(err, rows2, fields) {
                element.comment = rows2;
                if (index == rows.length - 1) {
                    rows = _.chain(rows).sortBy("createAt").reverse().value();
                    res.json(rows);
                }

            })
        })
    });
};



exports.create = function(req, res) {
    var content = req.body.content;
    content.author = 1;
    connection.query('INSERT INTO issue SET ?', content, function(err, rows, fields) {
        if (err) throw err;
        res.send('success');
    });
};

exports.comment = function(req, res) {
    var comment = req.body.comment;
    console.log(comment);
    connection.query('INSERT INTO comment SET ?', comment, function(err, rows, fields) {
        if (err) throw err;
        res.send('success');
    });
}
exports.update = function(req, res) {
    var issue_id = req.params.issue;
    console.log(issue_id);
    connection.query('UPDATE issue SET close=1 WHERE id=' + issue_id,
        function(err, rows, fields) {
            if (err) throw err;
            res.send('success');
        });
};