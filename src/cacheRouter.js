var cache = require('memory-cache');
var express = require('express');
var cacheRouter = express.Router();
const maxCacheTime = 15*60*1000;     //ms

//assumes that hashCode is sent as a parameter in url

var cacheRouterFunction = function (){
    
    cacheRouter.route('/:hash').put(function (req, res){
        let hashCode = req.params.hash.toString();
        let owmObject = JSON.stringify(req.body);
        let cached = cache.put(hashCode, owmObject, maxCacheTime);
        res.send("Cached successfully!");
        console.log(cached);
    });

    cacheRouter.route('/:hash').get(function (req, res){
        let hashCode = req.params.hash.toString();
        let owmObject = cache.get(hashCode);
        res.send(JSON.parse(owmObject));      //returns NULL if empty
    });
    return cacheRouter;
}
module.exports = cacheRouterFunction;