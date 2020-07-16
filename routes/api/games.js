const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../models/User');
const Game = require('../../models/Game');
const auth = require('../../middleware/auth');
const { default: Axios } = require('axios');

// @route  POST api/games
// @desc   Create a game
// @access private
router.post(
  '/',
  [
    auth,
    [
      check('designer', 'Designer name is required'),
      check('name', 'Game name is required'),
      check('players', 'Player Count is required'),
      check('playTime', 'Game Length is required'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newGame = new Game({
        designer: req.body.designer,
        name: req.body.name,
        players: req.body.players,
        playTime: req.body.playTime,
        user: req.user.id,
      });

      const game = await newGame.save();

      res.json(game);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/games
// @desc   Get all games
// @access public
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ date: -1 });
    res.json(games);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/games/:gameId
// @desc   Get game by id
// @access public
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    res.json(game);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/games/:gameId
// @desc   Delete game by id
// @access private
router.delete('/:gameId', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    if (game.user.toString() !== req.user.id) {
      return res.status(401).jsoon({ msg: 'User not authorized' });
    }

    await game.remove();

    res.json({ msg: 'Game removed' });
  } catch (error) {
    console.error(error.message);
    if (error.name == 'CastError') {
      return res.status(404).json({ msg: 'Game not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/games/like/:id
// @desc   Like a game
// @access private
router.put('/like/:gameId', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (
      game.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Game already liked' });
    }

    game.likes.unshift({ user: req.user.id });

    await game.save();

    res.json(game.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/games/unlike/:id
// @desc   unlike a game
// @access private
router.put('/unlike/:gameId', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (
      game.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Game has not been liked' });
    }

    const removeIndex = game.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    game.likes.splice(removeIndex, 1);

    await game.save();

    res.json(game.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/games/owner/:userId
// @desc   see all games owned by a user
// @access private
router.get('/owner/:userId', auth, async (req, res) => {
  try {
    const games = await Game.find({
      'owners.user': req.params.userId,
    });

    res.json(games);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/games/owners/:gameId
// @desc   see all game owners
// @access public
router.get('/owners/:gameId', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    res.json(game.owners);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/games/owners/new/:gameId
// @desc   add a game to collection
// @access private
router.put('/owners/new/:gameId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const game = await Game.findById(req.params.gameId);

    const newOwner = {
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    game.owners.unshift(newOwner);

    await game.save();

    res.json(game.owners);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/games/owners/remove/:gameId
// @desc   remove a game from collection
// @access private
router.put('/owners/remove/:gameId', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    const owner = game.owners.find(
      (owner) => owner.user.toString() === req.user.id
    );

    if (!owner) {
      return res.status(404).json({ msg: 'Game is not owned by this user' });
    }

    if (owner.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = game.owners
      .map((owner) => owner.user.toString())
      .indexOf(req.user.id);

    game.owners.splice(removeIndex, 1);

    await game.save();

    res.json(game.owners);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
