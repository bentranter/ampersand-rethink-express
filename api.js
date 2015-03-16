'use strict';

var thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'People'
});
var r = thinky.r;

// Put stupid constructor here
var People = thinky.createModel('People', {
      firstName: String,
      lastName:  String,
      coolnessFactor: Number,
      date: { _type: Date, default: r.now() }
});

// Ensure that date can be used as an index
People.ensureIndex('date');

// API Endpoints
exports.list = function (req, res) {
    People.orderBy({ index: r.desc('date') }).run().then(function(people) {
        res.json(people);
    }).error(function(err) {
        res.json({message: err});
    });
};

exports.add = function (req, res) {
    // Create new instance of 'People' model
    var person = new People(req.body);

    // Save the person and check for errors kind-of
    person.save().then(function(result) {
        res.json(result);
    }).error(function(err) {
        res.json({message: err});
    });
};

exports.get = function (req, res) {
    People.get(req.params.id).run().then(function(person) {
        res.json(person);
    }).error(function(err) {
        res.json({message: err});
    });
};

exports.delete = function (req, res) {
    People.get(req.params.id).run().then(function(user) {
        user.delete().then(function(result) {
            res.json(result);
        }).error(function(err) {
            // Couldn't delete
            res.json(err);
        });
    }).error(function(err) {
        // Couldn't find
        res.json({message: err});
    });
};

exports.update = function (req, res) {
    People.get(req.params.id).run().then(function(person) {

        if (req.body.firstName) {
            person.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            person.lastName = req.body.lastName;
        }
        if (req.body.coolnessFactor) {
            person.coolnessFactor = parseInt(req.body.coolnessFactor);
        }
        person.date = r.now();

        // Save the person and check for errors kind-of
        person.save().then(function(result) {
            res.json(result);
        }).error(function(err) {
            res.json({message: err});
        });
    });
};