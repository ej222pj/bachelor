'use strict';

const Tweet = require(__dirname + '/Schemas/tweet.js');

const add = (tweet) => new Tweet({ tweet }).save();
const findAll = () => Tweet.find({}).exec();
const findTen = () => Tweet.find().limit(10).exec();
const findHundred = () => Tweet.find().limit(100).exec();
const findFiveHundred = () => Tweet.find().limit(500).exec();
const findTenK = () => Tweet.find().limit(10000).exec();



module.exports = {
  add,
  findAll,
  findTen,
  findHundred,
  findFiveHundred,
  findTenK,
};