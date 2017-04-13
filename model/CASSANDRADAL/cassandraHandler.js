'use strict';

const Tweet = require(__dirname + '/Schemas/cassandra.js');

const add = (tweet) => new Tweet({ tweet }).save();
const findAll = () => Tweet.find({}).exec();
const findTen = () => Tweet.find().limit(10).exec();


module.exports = {
  add,
  findAll,
  findTen,
};