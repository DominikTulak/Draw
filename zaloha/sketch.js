var socket;
var dostal = 0;
var can;
var canSize;
var color1;
var color2;
var color3;
function setup()
{
	frameRate(60);
     	createCanvas(1900,900);
	background(51);
    	color1 = random(0,255)
	color2 = random(0,255)
	color3 = random(0,255);
	socket = io.connect("http://tulak.info:3000");
	socket.on("mouse", newDrawing);
	socket.on("can", recievedCan);
	socket.on("canSize", recievedCanSize);
	socket.on("vymazatPlatno", vycistitPrijato);
	socket.emit("sendHistory", "");
}
function mouseDragged(){
	
	var data = {
		x: mouseX,
		y: mouseY
	}	
	socket.emit("mouse", data);

	noStroke();
	fill(color1, color2, color3);
	ellipse(mouseX, mouseY, 36, 36);
}
function newDrawing(data){
	noStroke();
	fill(255,0,100);
	ellipse(data.x, data.y, 36, 36);
}
function draw(){
}
function recievedCan(data){
	if (dostal == 0){
		can = data
		noStroke();
		fill(128, 0, 50);
		for (var i = 0; i<canSize;i++){
			ellipse(data[i].x, data[i].y, 30, 30)			
		}
	dostal = 1
	}
}
function recievedCanSize(data){
	canSize = data;

}
function vycistit(){
	data = ""
	socket.emit("vymazatPlatno", data);
}
function vycistitPrijato(){
	dostal = 0;
	socket.emit("SendHistory", can);
	location.reload();
}
