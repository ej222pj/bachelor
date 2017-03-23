'use strict';

const Tweet = require(__dirname + '/Schemas/tweet.js');

const add = (tweet) => new Tweet({tweet}).save();
const findAll = () => Tweet.find({}).exec();

module.exports = {
  add,
  findAll,
};