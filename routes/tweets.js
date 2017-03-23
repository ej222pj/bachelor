var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const tweet = require('../model/DAL/tweetHandler.js');
const config = require('../config');



var router = express.Router();
var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret,
});
/* GET users listing. */
router.get('/', function (req, res, next) {
    let i = 0;
    //Change "count" and for loop below to get correct amount of tweets
    //for (let i = 0; i < 0; i++) {
    client.get('search/tweets', { q: "beer", count: 1 }, function (error, tweets, response) {
        if (!error) {
            
            for (let i = 0; i < tweets.statuses.length; i++) {
                tweet.add(tweets.statuses[i]).then(function () {
                    console.log("You have enough tweets! Stop adding!")
                });
            }
        }
        else {
            //res.status(500).json({ error: error });
            res.send('respond with a error');
        }
    });
    //}

    tweet.findAll().then(function (tweets) {
        let numberOfTweets = tweets.length + " stycken! Det räcker nu va!";
        res.send(numberOfTweets);
    });


});

module.exports = router;