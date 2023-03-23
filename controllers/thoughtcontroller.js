const {Thought, User} = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    },

    // get thought using id
    getThoughtWithId(req, res) {
        Thought.findOne(
            {_id: req.params.id}
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    },

    // create thought
    createThought(req, res) {
        Thought.create(
            req.body
        )
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: req.params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    },

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            {_id: req.params.id}
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    },

    // create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {reactions: req.body}},
            {new: true}
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    },

    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new: true}
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    }
};

