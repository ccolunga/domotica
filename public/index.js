var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('ledOn', function(data){
	$("#distance").val(data);
});

$("#active").click(function(){
	socket.emit('led:on');
	console.log("Emitido X");
});

socket.on('ledOff', function(data){
	$("#distance").val(data);
});

$("#ledoff").click(function(){
		socket.emit('led:off');
		console.log("emitido Y")
});

socket.on('temp', function(data){
	$("#temp").val(data);
});