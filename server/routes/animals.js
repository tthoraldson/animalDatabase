var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

var random = require('../public/modules/random.js');

router.post('/', function (req, res) {
  var animal = req.body;
  animal.count = random.randomNumber();
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    else {
    client.query('INSERT INTO animals(animal, count) '
                + 'VALUES ($1, $2)',
                [animal.name, animal.count],
                function (err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  }
                  else {
                    res.sendStatus(201);
                  }
                });
    }
  });
});

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result) {
      done(); // closes connection, I only have 10!

      if (err) {
        res.sendStatus(500);
      }
      else {
        res.send(result.rows);
      }
    });
  });
});

module.exports = router;
