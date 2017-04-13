const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let tweetSchema = new Schema({
  tweet: {type: JSON},
});

let Model = mongoose.model('tweet', tweetSchema);

module.exports = Model;

//https://www.npmjs.com/package/cassanova