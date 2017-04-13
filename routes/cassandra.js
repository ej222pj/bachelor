var express = require('express');
var router = express.Router();
const tweet = require('../model/DAL/tweetHandler.js');
const cassandra = require("cassandra-driver");
//const cassandraConnection = require('../model/CASSANDRADAL/helper.js');

var connection;
var db_config = {
    contactPoints: ['127.0.0.1'],
    keyspace: 'tweets',
    setFetchSize: 10000
};
connection = new cassandra.Client(db_config);
connection.connect(function (err, result) {
    console.log('cassandra connected');
});

function RunTenTimes(run, start, end) {
    tweet.findHundred().then(function (tweets) {
        var startTime = new Date();
        for (i = start; i < end; i++) {
            var query = 'INSERT INTO Tweets_fact (id, created_at, description, favourite_count, geo, in_reply_to_screen_name, in_reply_to_status_id, in_reply_to_status_id_str, lang, location, place, retweet_count, screen_name, source, text, time_zone, user_created_at, utc_offset) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [run + end + i,
            tweets[i].tweet.created_at,
            tweets[i].tweet.user.description,
            tweets[i].tweet.favorite_count,
                null,
            tweets[i].tweet.in_reply_to_screen_name,
            tweets[i].tweet.in_reply_to_status_id,
            tweets[i].tweet.in_reply_to_status_id_str,
            tweets[i].tweet.lang,
            tweets[i].tweet.user.location,
                null,
            tweets[i].tweet.retweet_count,
            tweets[i].tweet.user.screen_name,
            tweets[i].tweet.source,
            tweets[i].tweet.text,
            tweets[i].tweet.user.time_zone,
            tweets[i].tweet.user.created_at,
            tweets[i].tweet.user.utc_offset,
            ];
            connection.execute(query, params, { prepare: true }, function (err) {
                if (err) {
                    throw err;
                }
                else {

                }
            });
        }
        var endTime = new Date();
        console.log("Run " + run + " was done in " + (endTime - startTime) + " milliseconds")
    });
}

function RunHundredTimes(run, start, end) {
    tweet.findFiveHundred().then(function (tweets) {
        var startTime = new Date();
        for (i = start; i < end; i++) {
            var query = 'INSERT INTO Tweets_fact (id, created_at, description, favourite_count, geo, in_reply_to_screen_name, in_reply_to_status_id, in_reply_to_status_id_str, lang, location, place, retweet_count, screen_name, source, text, time_zone, user_created_at, utc_offset) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [run + end + i,
            tweets[i].tweet.created_at,
            tweets[i].tweet.user.description,
            tweets[i].tweet.favorite_count,
                null,
            tweets[i].tweet.in_reply_to_screen_name,
            tweets[i].tweet.in_reply_to_status_id,
            tweets[i].tweet.in_reply_to_status_id_str,
            tweets[i].tweet.lang,
            tweets[i].tweet.user.location,
                null,
            tweets[i].tweet.retweet_count,
            tweets[i].tweet.user.screen_name,
            tweets[i].tweet.source,
            tweets[i].tweet.text,
            tweets[i].tweet.user.time_zone,
            tweets[i].tweet.user.created_at,
            tweets[i].tweet.user.utc_offset,
            ];
            connection.execute(query, params, { prepare: true }, function (err) {
                if (err) {
                    throw err;
                }
                else {
                }
            });
        }
        var endTime = new Date();
        console.log("Run " + run + " was done in " + (endTime - startTime) + " milliseconds")
    });
}

function readFromCassandra(run, limit) {
    var startTime = new Date();
    connection.stream("SELECT * FROM Tweets_fact LIMIT " + limit)
        .on('readable', function () {
            // readable is emitted as soon a row is received and parsed
            var row;
            while (row = this.read()) {
                // process row
            }
        })
        .on('end', function () {
            // emitted when all rows have been retrieved and read
            var endTime = new Date();
            console.log("Run " + run + " was done in " + (endTime - startTime) + " milliseconds")
        });

}

var firstMethod = function () {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(1, 0, 10)
    });
    return secondMethod();
};

var secondMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(2, 0, 20)
    });
    return thirdMethod();
};

var thirdMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(3, 0, 30)
    });
    return fourthMethod();
};

var fourthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(4, 0, 40)
    });
    return fifthMethod();
};

var fifthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(5, 0, 50)
    });
    return sixthMethod();
};

var sixthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(6, 0, 60)
    });
    return seventhMethod();
};

var seventhMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(7, 0, 70)
    });
    return eigthMethod();
};

var eigthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(8, 0, 80)
    });
    return ninthMethod();
};

var ninthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(9, 0, 90)
    });
    return tenthMethod();
};

var tenthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunTenTimes(10, 0, 100)
    });
    return eleventhMethod();
};
var eleventhMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunHundredTimes(11, 0, 200)
    });
    return twelvethMethod();
};

var twelvethMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunHundredTimes(12, 0, 300)
    });
    return thirteenthMethod();
};

var thirteenthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunHundredTimes(13, 0, 400)
    });
    return fourteenthMethod();
};

var fourteenthMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        RunHundredTimes(14, 0, 500)
    });
    return promise;
};

var readOneKMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        readFromCassandra(1, 1000)
    });
    return readFiveKMethod();
};

var readFiveKMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        readFromCassandra(2, 5000)
    });
    return readTenKMethod();
};

var readTenKMethod = function (someStuff) {
    var promise = new Promise(function (resolve, reject) {
        readFromCassandra(3, 10000)
    });
    return promise;
};

/* GET home page. */
router.get('/', function (req, res, next) {
    firstMethod()
    res.send("Cassandra");
});

router.get('/read', function (req, res, next) {
    readOneKMethod()
    res.send("Read From Cassandra");
});

router.get('/insert', function (req, res, next) {
    tweet.findTenK().then(function (tweets) {
        var startTime = new Date();
        for (i = 0; i < 10000; i++) {
            var query = 'INSERT INTO Tweets_fact (id, created_at, description, favourite_count, geo, in_reply_to_screen_name, in_reply_to_status_id, in_reply_to_status_id_str, lang, location, place, retweet_count, screen_name, source, text, time_zone, user_created_at, utc_offset) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [i,
                tweets[i].tweet.created_at,
                tweets[i].tweet.user.description,
                tweets[i].tweet.favorite_count,
                null,
                tweets[i].tweet.in_reply_to_screen_name,
                tweets[i].tweet.in_reply_to_status_id,
                tweets[i].tweet.in_reply_to_status_id_str,
                tweets[i].tweet.lang,
                tweets[i].tweet.user.location,
                null,
                tweets[i].tweet.retweet_count,
                tweets[i].tweet.user.screen_name,
                tweets[i].tweet.source,
                tweets[i].tweet.text,
                tweets[i].tweet.user.time_zone,
                tweets[i].tweet.user.created_at,
                tweets[i].tweet.user.utc_offset,
            ];
            connection.execute(query, params, { prepare: true }, function (err) {
                if (err) {
                    throw err;
                }
                else {
                }
            });
        }
        var endTime = new Date();
        console.log("Insert alot was done in " + (endTime - startTime) + " milliseconds")
    });
    res.send("Inserted 10k");
});

router.get('/cleardb', function (req, res, next) {
    var query = 'TRUNCATE TABLE Tweets_fact';

    connection.execute(query, function (err) {
        if (err) {
            throw err;
        }
    });
    res.send("Cassandra");
});

router.get('/records', function (req, res, next) {
    var r;

    connection.execute("SELECT * FROM Tweets_fact", function (err, result) {
        console.log(result)
        if (!err) {
            if (result.rows.length > 0) {
                r = result.rows.length;
                console.log(r + "Results");
            } else {
                console.log("No results");
            }
        }
    });
    res.send(r + " stycken");
});


module.exports = router;

