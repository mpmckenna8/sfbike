//var MongoClient = require('mongodb').MongoClient
var request = require('request');


request('http://bayareabikeshare.com/stations/json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
var reddi = []
            var stories = obj.stationBeanList.map(function (station) { return station;}
              );
            var when = obj.executionTime;
            console.log(when);
            console.log(typeof stories);
return stories
        }
    });
