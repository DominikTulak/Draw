var socket;
var dostal = 0;
var can;
var cnv;
var red;
var green;
var blue;
var size;
function setup()
{
	frameRate(60);
    cnv = createCanvas(1900,900);
	cnv.parent("hra");
	background(51);
    red = random(0,255)
	green = random(0,255)
	blue = random(0,255);
	document.getElementById("red").value = red;
	document.getElementById("green").value = green;
	document.getElementById("blue").value = blue;
	size = 36; 
	socket = io.connect("http://tulak.info:3000");
	socket.on("DRAW_kreslim", recievedDrawing);
	socket.on("DRAW_PosilamHistorii", prijimamHistory);
	socket.on("DRAW_vymazatPlatno", vymazatPlatno);
}
function mouseDragged(){
	var data = {
		x: mouseX,
		y: mouseY,
		r: red,
		g: green,
		b: blue,
		s: size
	}	
	socket.emit("DRAW_kreslim", data);
	noStroke();
	fill(red, green, blue);
	ellipse(mouseX, mouseY, size, size);
}

function recievedDrawing(data){
	noStroke();
	fill(data.r,data.g,data.b);
	ellipse(data.x, data.y, data.s, data.s);
}
function draw(){
}
function prijimamHistory(data){
	if (dostal == 0){
		can = data
		noStroke();
		for (var i = 0; i<can.length;i++){
			fill(data[i].r, data[i].g, data[i].b);
			ellipse(data[i].x, data[i].y, data[i].s, data[i].s)			
		}
	dostal = 1
	}
}
function vycistit(){
	data = ""
	socket.emit("DRAW_vymazatPlatno", data);
}
function vymazatPlatno(data){
	location.reload();
}
function nastavitBarvu(){
	red = Number(document.getElementById("red").value);
	if(red<0){red = 0};
	if(red>255){red=255};

	green = Number(document.getElementById("green").value);
	if(green<0){green = 0};
	if(green>255){green=255};

	blue = Number(document.getElementById("blue").value);
	if(blue<0){blue = 0};
	if(blue>255){blue=255};

	size = Number(document.getElementById("size").value);
	if(size<0){size = 0};
	if(size>255){size=255};
}