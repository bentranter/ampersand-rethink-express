'use strict';

var thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyFast'
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
    });
};

exports.add = function (req, res) {

    // Create new instance of 'People' model
    var person = new People({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        coolnessFactor: parseInt(req.body.coolnessFactor)
    });

    // Save the person and check for errors kind-of
    person.save(function(err, doc) {
        if (err) {
            res.send(err);
            console.log(err);
            console.log('Error');
        } else {
            res.json(doc);
            console.log(doc);
            console.log('Success');
        }
    });
};

exports.get = function (req, res) {

    People.get(req.params.id).run().then(function(person) {
        res.json(person);
    });
};

exports.delete = function (req, res) {

    People.get(req.params.id).delete().run().then(function(error, result) {
        res.json({
            error: error,
            result: result
        });
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
        person.save(function(err, doc) {
            if (err) {
                res.send(err);
                console.log(err);
                console.log('Error');
            } else {
                res.json(doc);
                console.log(doc);
                console.log('Success');
            }
        });
    });
};

