var express = require('express');
var favoritesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function () {

    //GET ALL FAVORITES FROM DATABASE:
        favoritesRouter.route('/users/:userId').get(function (req, res) {
            console.log("***INSIDE GET METHOD***");
            const url = 'mongodb://localhost:27017/favorites';
            mongodb.connect(url, function(err, db) {
            if(err != null){ 
                console.log(err);
                res.send(err);
            }
            var collection = db.collection(req.params.userId.toString());
            var cursor = collection.find({},{_id:0});
            cursor.toArray(function(err, docs){
                console.log("Printing docs from Array")
                docs.forEach(function(doc) {
                console.log("Doc from Array ");
                console.dir(doc);
                res.send(docs);
                });
            });
            });
        });
       

    //POST DATA TO DATABASE:
        favoritesRouter.route('/users/:userId').put(function (req, res) {
            console.log("***INSIDE PUT METHOD***"); 
            const url = 'mongodb://localhost:27017/favorites';
            let bodyParam = req.body;
            bodyParam.lat = Number(bodyParam.lat).toFixed(2);
            bodyParam.lng = Number(bodyParam.lng).toFixed(2);
            bodyParam._id = bodyParam.lat.toString() + bodyParam.lng.toString();
                       
            mongodb.connect(url, function(err, db) {
            if(err != null) throw Error;
            console.log("Connected correctly to server. Ready to put in some data.");
            var collection = db.collection(req.params.userId.toString());
            collection.insertOne(bodyParam, function (err, result){
                if(err){
                    console.log("Error while trying to put data into the database." + err);
                    res.send(err);
                }else{
                    res.send("Successfuly updated!");
                }
                db.close();
            });
            }); 
        });
        return favoritesRouter;
}

module.exports = router;