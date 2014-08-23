var http = require('http');

http.get("http://bayareabikeshare.com/stations/json", function(res){
  console.log(res);
}).on('err',function(e){console.log(e.message +" is the error msg.")});
