var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://peyman:Minalove1355@peymancyb-shard-00-00-dwrwu.mongodb.net:27017,peymancyb-shard-00-01-dwrwu.mongodb.net:27017,peymancyb-shard-00-02-dwrwu.mongodb.net:27017/test?ssl=true&replicaSet=peymancyb-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
  db.close();
});
