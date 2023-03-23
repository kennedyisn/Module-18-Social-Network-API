const { User, Thought } = require('../models');

module.exports = {
    // get users
    getUsers(req, res) {
        User.find({})
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },

    // get user with id
    getUserWithId(req, res) {
        User.findOne(
            {_id: req.params.id}
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },

    // create user
    createUser(req, res) {
        User.create(
            req.body
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },

    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {runValidators: true, new: true}
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },

    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete(
            {_id: req.params.id}
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },

    // add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },

    // delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    }
};