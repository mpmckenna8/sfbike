//var MongoClient = require('mongodb').MongoClient
var request = require('request');
var fs = require('fs')

var babs =   request('http://bayareabikeshare.com/stations/json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
var stats = [];
            var stories = obj.stationBeanList.map(function (story) { if(story.stationName){return stats.push(story); }});
            var when = obj.executionTime;
var senda = JSON.stringify(stats);

          //   console.log(when);
          fs.writeFile('babsDataNow.json', senda, function(err){
             if(err) throw err;
             console.log("i done think I saved a file of babs data...")
           });

        }
    });

//var writetoNew = fs.writeFile('babsData' +when,)

  //  console.log(babs);
//babs.pipe(process.stdout)
