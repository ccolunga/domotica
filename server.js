var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require('johnny-five');

 app.use(express.static('public'));

 app.get('/', function(req, res){
 	res.sendFile(__dirname + 'public/index.html');
 });

var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    var led = new five.Led(5);

    var temp = new five.Thermometer({
    	pin: "A0",
    	controller: "LM35"
    });

    var proximity = new five.Proximity({
    	controller: "HCSR04",
    	pin: 7,
    	freq: 50
  	});

    io.on('connection', function(socket){
			console.log('good');
			//Temperatura
			temp.on("change", function(data){
				var temp = this.celsius;
				socket.emit('temp', this.celsius + "°C");
    		//console.log("temp: " + temp);
    	});

    	/** Sensor de proximidad **/
    	proximity.on("data", function(data) {
    	  socket.emit('prox', this.cm + "cm");
    	  //console.log("-----------------");
    	});

			/** Leds **/
			socket.on('led:on', function(data){
				led.on();
				socket.emit('ledOn', 'Led prendido');
			});
			socket.on('led:off', function(data){
				led.off();
				socket.emit('ledOff', 'Led apagado');
			});
		/** Leds **/
	});
});

server.listen(8080, function(){
	console.log("Servidor corriendo");
});


