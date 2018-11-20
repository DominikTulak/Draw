
// Nastavení socketů
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
//

var can = [];
var hist = [];
var histSize = 0

io.sockets.on('connection', newConnection);
function newConnection(socket){
	console.log("Connceted client: "+socket.id);
	//<DRAW>
	io.to(socket.id).emit('DRAW_PosilamHistorii', can);
	socket.on("DRAW_kreslim", mouseMsg);
	socket.on("DRAW_vymazatPlatno", vymazatPlatno);
	//</DRAW>
	//<CHAT>
	io.to(socket.id).emit('CHAT_historie', hist);
	socket.on("CHAT_message", chatMsg);
	socket.on("CHAT_historie", historie);
	socket.on("CHAT_obnovit", vycistit);
	//</CHAT>
	//<DRAW>
	function mouseMsg(data){
		can[can.length] = data;
		console.log(can);
		//io.sockets.emit("mouse", data);
		socket.broadcast.emit("DRAW_kreslim", data);
	}
	function vymazatPlatno(data){
		io.sockets.emit("DRAW_vymazatPlatno", data);
		can = []
		//socket.broadcast.emit("DRAW_vymazatPlatno", "");
	}
	//</DRAW>
	//<CHAT>
	function chatMsg(data){
		if (data != "/clear"){
			hist[histSize] = data + "<br>";
			histSize++;
			console.log(hist);
			io.sockets.emit("CHAT_message", data);
		}
		else {
			vycistit();
		}
	}
	function historie(data){
		console.log(data);
		io.sockets.emit("CHAT_histSize", histSize);
		io.sockets.emit("CHAT_historie", hist);
	}
	function vycistit(data){
		console.log("CHAT_REFRESH!");
		hist = [];
		histSize = 0;
		io.sockets.emit("CHAT_obnovit", data);
	}
	//</CHAT>
}
