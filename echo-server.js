/**
* Socket.IO server (single process only)
* http or https
*/
var express = require("express");

// see https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x
// https://gist.github.com/1036976 very simple socket.io@0.7 echo server 

var app = express();
var port = 9002;

// Node native SSL support
// make sure to have the correct file access permissions set
// to disable set to false
var settings = false; // http

/*
// How to generate self-signed server certificates
// https://github.com/Wikinaut/echo-server-running-on-node/wiki/How-to-set-up-SSL
var settings = { "ssl" :
	          {
		   "key"  : "/path-to-your/node-server.key",
		   "cert" : "/path-to-your/node-server.crt"
		  }
        }; // https
*/

if (settings.ssl) {

  var fs = require("graceful-fs");

  options = {
    key: fs.readFileSync( settings.ssl.key ),
    cert: fs.readFileSync( settings.ssl.cert )
  };
    
  var https = require('https');
  var server = https.createServer(options, app);

  console.log( "SSL -- enabled");
  console.log( "SSL -- server key file: " + settings.ssl.key );
  console.log( "SSL -- Certificate Authority's certificate file: " + settings.ssl.cert );

} else {

  var http = require('http');
  var server = http.createServer(app);

  console.warn( "SSL -- not enabled!" );

}


var io = require('socket.io').listen(server);

server.listen(port);

/*
io.set('transports', [
    'websocket'
  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);
*/

io.set('transports', [ 'jsonp-polling'] );

// https://github.com/LearnBoost/socket.io/issues/283 
// lower the number to lessen the debug output
// log level 0 or 1 : info output
// 2: debug output
io.set( 'log level', 0 );

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client.html');
});

io.sockets.on('connection', function (socket) {
  console.log('connection established');
  io.sockets.emit('announcement', "connected" );

  socket.on('user message', function (msg) {
    // console.log( "received: " + msg);

    // socket.broadcast.emit('user message', msg);
    if ( msg == 27 ) {
	io.sockets.emit('announcement', "Socket stopped at server side. You can reestablish the socket connection by restarting your server." );

	// for server-side disconnect see https://github.com/LearnBoost/socket.io/issues/795
	socket.disconnect();
	
    } else {
        io.sockets.emit('user message', msg);
	io.sockets.emit('announcement', "connected" );
    }
  });

});
