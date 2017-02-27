var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require('johnny-five');

 app.use(express.static('public'));

 app.get('/', function(req, res){
 	res.sendFile(__dirname + 'public/index.html');
 });

// var ledOn = "Led encendido";
// var ledOff = "";

var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    var led = new five.Led(5);

    io.on('connection', function(socket){
			console.log('good');

			socket.on('led:on', function(data){
			led.on();
			socket.emit('ledOn', 'Led prendido');
		});

		socket.on('led:off', function(data){
			led.off();
			socket.emit('ledOff', 'Led apagado');
		});
	});
});

server.listen(8080, function(){
	console.log("Servidor corriendo");
});


