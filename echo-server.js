/**
* Socket.IO server (single process only)
*/
var express = require("express");

// see https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x
// https://gist.github.com/1036976 very simple socket.io@0.7 echo server 

var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(9002);

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
