'use strict';

const cassandra = require("cassandra-driver");

const initialize = () => {
  var connection;
  var db_config = {
    contactPoints: ['127.0.0.1'],
    keyspace: 'tweets'
  };
  connection = new cassandra.Client(db_config);
  connection.connect(function (err, result) {
    console.log('cassandra connected');
  });

}

module.exports = initialize();

