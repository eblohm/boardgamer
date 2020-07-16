const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  designer: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  players: {
    type: String,
    required: true,
  },
  playTime: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  owners: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('game', GameSchema);
