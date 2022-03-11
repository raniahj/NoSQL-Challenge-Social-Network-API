const { User } = require('../models');

const userController = {
  // get all function
  getAllUsers(req, res) {
    User.find()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// get one user by id
getUserById({ params }, res) {
    User.findOne({_id: params.id })
    .then(dbUserData => {
      // If no user is found, send 404
      if (!dbUserData) {
        res.status(404).json({ message: 'There was no user found with this id. Please try again.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},
// create user
createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
// update user by id
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'There was no user found with this id. Please try again.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'There was no user found with this id. Please try again.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
//create a friend
createFriend({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'There was no user found with this id. Please try again.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
//delete a friend
deleteFriend({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'There was no user found with this id. Please try again.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

};

module.exports = userController;