const router = require('express').Router();

// pull CRUD from thoughts-contoller
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

// routes for thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtsId/reactions')
    .post(createReaction)

router
    .route('/:thougtsId/reaction/reactionId')
    .delete(removeReaction)

module.exports = router;