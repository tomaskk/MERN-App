const express = require('express');
const userRoutes = express.Router();

// Data model
let User = require('./user.model');

// Add new user
userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);

  user.save()
    .then(user => {
      res.status(200).json({'user': 'user in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// home
userRoutes.route('/').get(function (req, res) {
    User.find(function(err, Allusers){
    if(err){
      console.log(err);
    }
    else {
      res.json(Allusers);
    }
  });
});

// Edit user
userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      res.json(user);
  });
});

// Update user
userRoutes.route('/update/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("data is not found");
    else {
      user.person_name = req.body.person_name;
      user.person_lastname = req.body.person_lastname;
      user.city = req.body.city;
      user.person_address = req.body.person_address;
      user.zip_code = req.body.zip_code;
      user.username = req.body.username;
      user.password = req.body.password;

      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Delete user
userRoutes.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) 
          res.json(err);
        else 
          res.json('Successfully removed');  
    });
});

module.exports = userRoutes;