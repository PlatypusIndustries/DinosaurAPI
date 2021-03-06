// CONFIGURE DINOSAUR ROUTER
// =================================================================

// import the packages we need
var express = require('express');

// import the models we need
var Dinosaur = require('../models/dinosaur.js');

// get an instance of the express router
var router = express.Router();

// set the base route
router.route('/')

  // define route to retrieve all dinosaurs (accessed via GET http://localhost:8000/api/dinosaurs)
  .get(function(req, res) {
    // find all dinosaur records and execute callback function
    Dinosaur.find(function(err, dinosaurs) {
      if (err) {
        // return an error in the response
        res.send(err);
      } else {
        // return a message and all dinosaur records in the response
        res.json({
          message: 'Dinosaurs found!',
          dinosaurs
        });
      };
    });
  })

  // define route to create a dinosaur (accessed via POST http://localhost:8000/api/dinosaurs)
  .post(function(req, res) {
    // build a new instance of the dinosaur model
    var dinosaur = new Dinosaur();
    // set the dinosaur name based on the request body
    dinosaur.name = req.body.name;
    // check for errors and save the dinosaur
    dinosaur.save(function(err) {
      if (err) {
        // return an error in the response
        res.send(err);
      } else {
        // return a message and the dinosaur record in the response
        res.json({
          message: 'Dinosaur created!',
          dinosaur
        });
      };
    });
  });

// set the base route
router.route('/:dinosaur_id')

  // define route to retrieve a dinosaur (accessed via GET http://localhost:8000/api/:dinosaur_id)
  .get(function(req, res) {
    // find dinosaur record by id and execute callback function
    Dinosaur.findById(req.params.dinosaur_id, function(err, dinosaur) {
      if (err) {
        // return an error in the response
        res.send(err);
      } else {
        // return a message and the dinosaur record in the response
        res.json({
          message: 'Dinosaur found!',
          dinosaur
        });
      };
    });
  })

  // define route to update a dinosaur (accessed via PUT http://localhost:8000/api/:dinosaur_id)
  .put(function(req, res) {
    // find dinosaur record by id and execute callback function
    Dinosaur.findById(req.params.dinosaur_id, function(err, dinosaur) {
      if (err) {
        // return an error in the response
        res.send(err);
      } else {
        // set the dinosaur name based on the request body
        dinosaur.name = req.body.name;
        // check for errors and save the dinosaur
        dinosaur.save(function(err) {
          if (err) {
            // return an error in the response
            res.send(err);
          } else {
            // return a message and the dinosaur record in the response
            res.json({
              message: 'Dinosaur updated!',
              dinosaur
            });
          };
        });
      };
    });
  })

  // define route to delete a dinosaur (accessed via DELETE http://localhost:8000/api/:dinosaur_id)
  .delete(function(req, res) {
    // find dinosaur record by id and execute callback function
    Dinosaur.findById(req.params.dinosaur_id, function(err, dinosaur) {
      if(err) {
        // return an error in the response
        res.send(err);
      } else {
        // remove the dinosaur
        dinosaur.remove(function(err) {
          if (err) {
            // return an error in the response
            res.send(err);
          } else {
            // return a message and the dinosaur record in the response
            res.json({
              message: 'Dinosaur removed!',
              dinosaur
            });
          }
        });
      };
    });
  });

// export router for use in the application
module.exports = router;
