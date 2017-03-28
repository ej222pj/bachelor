var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


  var cassandra = require("cassandra-driver");
  var connection;
  var db_config = {
    contactPoints : ['127.0.0.1'],
    keyspace:'tweets'
  };
  connection = new cassandra.Client(db_config);
  connection.connect(function(err,result){
      console.log('cassandra connected');
  });

  var query = 'INSERT INTO Tweet_fact (ID, favourite_count) VALUES (?)';
  var params = [1, 3];

  connection.execute(query, params, { prepare: true }, function (err) {
      if(err) {  
          throw err;
      } 
  });
  res.send("Cassandra");
});

module.exports = router;
