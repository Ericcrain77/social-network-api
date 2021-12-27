const { Thoughts, Users } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    getThoughtById(req, res) {
        Thoughts.findOne({ _id: req.params.id })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    createThought(req, res) {
        Thoughts.create(req.body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { _id: req.body.usersId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.id })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    }
};

module.exports = thoughtsController;