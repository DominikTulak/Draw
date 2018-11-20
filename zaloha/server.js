var express = require('express');
var app = express();
var server = app.listen(3000);
var hist = [];
var histSize = 0
var can = [];
var canSize = 0

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);
function newConnection(socket){
	console.log("Connceted client: "+socket.id);
	socket.on("message", chatMsg);
	socket.on("historie", historie);
	socket.on("mouse", mouseMsg);
	socket.on("obnovit", vycistit);
	socket.on("vymazatPlatno", vymazatPlatno);
	socket.on("sendHistory", sendHistory);

	function mouseMsg(data){
		can[canSize] = data;
		canSize+=1
		console.log(can);
		//io.sockets.emit("mouse", data);
		socket.broadcast.emit("mouse", data);
	}

}
function historieCanvas(){
	socket.broadcast.emit("can", can);
	socket.broadcast.emit("canSize", canSize);
}
function chatMsg(data){
	if (data != "/clear"){
		hist[histSize] = data + "<br>";
		histSize++;
		console.log(hist);
		io.sockets.emit("message", data);
	}
	else {
		vycistit();
	}
}
function historie(data){
	console.log(data);
	io.sockets.emit("histSize", histSize);
	io.sockets.emit("historie", hist);
}

function vycistit(data){
	console.log("REFRESH!");
	hist = [];
	histSize = 0;
	io.sockets.emit("obnovit", data);
}
function vymazatPlatno(data){
	can = [];
	canSize = 0;
	io.sockets.emit("vymazatPlatno", data);
}

function sendHistory(data){
	io.sockets.emit("canSize", canSize);
	io.sockets.emit("can", can);
}
