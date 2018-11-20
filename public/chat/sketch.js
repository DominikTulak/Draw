var socket;
var historieP = 0;
var histSize;
setInterval(Ulozit, 1000);
setTimeout(Nahrat, 10);
setTimeout(Start, 10);
function Start(){
	console.log("Connected");
	socket = io.connect("http://tulak.info:3000");
	socket.emit("historie", "");
	socket.on("CHAT_message", recievedMessage);
	socket.on("CHAT_histSize", recievedHistSize);
	socket.on("CHAT_historie", recievedHistorie);
	socket.on("CHAT_obnovit", obnovit);
}
function recievedMessage(data){
	console.log("Prijato");
	console.log(data);
	document.getElementById("text").innerHTML =  document.getElementById("text").innerHTML + "<br>" + data.toString();
	document.getElementById("text").scrollTop = document.getElementById("text").scrollHeight;
}

function recievedHistorie(data){
	if (historieP == 0){
		if (data != []){
			console.log("Prijato - historie");
			for(var i = 0; i <data.length; i++){
				document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + data[i].toString();
			}
		}
		document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + "---Konec historie---";
		document.getElementById("text").scrollTop = document.getElementById("text").scrollHeight;
		historieP = 1;
		
		
	}
}
function recievedHistSize(data){
	histSize = data;
}
function sendClick(){
	var data = document.getElementById("inp1").value;
	if (data != "/clear"){
		if (document.getElementById("inp2").value == ""){
			data = "Anonym: "+ data;
		}
		else {
			data = document.getElementById("inp2").value +": " + data;
		}
	}

	document.getElementById("inp1").value = "";
	console.log(data);
	socket.emit("CHAT_message", data);
}
function keyPressed(e){
    if (e.keyCode == 13) {
        sendClick();
    }
}
function obnovit(data){
    console.log("Wheeee");
    historieP = 0;
    socket.emit("CHAT_historie", "");
    location.reload();
}
function Nahrat(){
	if (localStorage.getItem("jmeno") != "undefined"){

        document.getElementById("inp2").value = localStorage.getItem("jmeno");

    	}
	else {
		Ulozit();
	}

}
function Ulozit(){
        localStorage.setItem("jmeno", document.getElementById("inp2").value);

}