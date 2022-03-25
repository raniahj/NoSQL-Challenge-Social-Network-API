const { Thought } = require('../models');

const thoughtController = {
  // get all function
  getAllThoughts(req, res) {
    Thought.find()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

// get one thought by id
getThoughtById({ params }, res) {
  console.log(params)
    Thought.findOne({_id: params.id })
    .then(dbThoughtData => {
      // If no thought is found, send 404
      if (!dbThoughtData) {
        res.status(404).json({ message: 'There was no user found with this id. Please try again.' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},



// create thought
createThought({ params, body }, res) {
  console.log(body)
    Thought.create({  
      thoughtText: body.thoughtText,
      userName: body.userName,
      userId: params.userId })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { thoughts: _id } },
            { new: true }
        );
        })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
// update thought by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'There was no thought found with this id. Please try again.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'There was no thought found with this id. Please try again.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
//create a reaction
createReaction({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'There was no thought found with this id. Please try again.' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},
//delete a reaction
deleteReaction({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'There was no thought found with this id. Please try again.' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

};

module.exports = thoughtController;