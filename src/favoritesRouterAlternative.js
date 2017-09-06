const express = require('express');
const favoritesRouterAlternative = express.Router();
const {Client} = require('pg');
const client = new Client({ user: 'postgres',
                          host: 'localhost',
                          database: 'favorites',
                          password: 'hrvatska15',
                          port: 5433});

var favoritesRouterAlternativeFunction = function() {
    //PUT METHOD:
    favoritesRouterAlternative.route('/users/:userId').put(function(req, res){
        console.log("***INSIDE PUT METHOD***"); 
        let lat = Number(req.body.lat).toFixed(2);
        let lng = Number(req.body.lng).toFixed(2);
        let cityname = req.body.cityName.toString();
        let username = req.params.userId.toString();
        
        client.connect();
            
        client.query('INSERT INTO favoritesinput (username, city, lat, lng) VALUES ($1, $2, $3, $4)', [username, cityname, lat, lng], function(err, rows){
            if(err){
                console.log("Error occured while trying to execute query... " + err);
                throw err;
            }
        console.log(rows);
        res.send(rows);
        client.end();
        });    
    });

    //GET METHOD:
    favoritesRouterAlternative.route('/users/:userId').get(function(req, res){
        console.log("***INSIDE PUT METHOD***");
        //GET ALL FAVORITES FROM A NAMED USER:
        let username = req.params.userId.toString();

        client.connect();

        client.query('SELECT * FROM favoritesinput WHERE username=' + "'" + username + "'", function (err, result){
            if(err){
                console.log('Error while trying to execute query...' + err);
                throw err;
            }
            res.send(result.rows);
            client.end();
        });
    });
    return favoritesRouterAlternative;
}

module.exports = favoritesRouterAlternativeFunction;