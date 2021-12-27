const { Users } = require('../models');

const usersController = {
    getAllUsers(req, res) {
        Users.find({})
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getUserById(req, res) {
        Users.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts'
            })
            .populate({
                path: 'friends'
            })
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser(req, res) {
        Users.create(req.body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    deleteUser(req, res) {
        Users.findOneAndDelete({ _id: req.params.id })
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    removeFriend(req, res) {
        Users.findByIdAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = usersController;