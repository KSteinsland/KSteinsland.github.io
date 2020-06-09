var h1 = document.getElementById("myHeader");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

var slider = document.getElementById("myRange");
slider.defaultValue = 0;

drawing = new Image();
drawing.src = "kart.png";



//strucutes
function Point(x, y) {
  	this.x = x;
  	this.y = y;
}


function Place(point, text, imgPath) {
	this.point = point;
	this.text = text;
	this.imgPath = imgPath;
}

function Trip(){
	this.places = [
		new Place(	new Point(80, 630), 
				 	"Stavanger",
				 	"/bilde.png"), 

		new Place(	new Point(70, 600), 
				 	"Bergen",
				 	"/bilde.png"), 

		new Place(	new Point(100, 560), 
				 	"Agatunet",
				 	"/bilde.png"), 

		new Place(	new Point(70, 450), 
				 	"Shetland",
				 	"/bilde.png"),

		new Place(	new Point(400, 100), 
				 	"Frosta",
				 	"/bilde.png"), 
	];
	this.points = [];
	for (var i = 0; i < this.places.length; i++) {
		this.points.push(this.places[i].point);
	}
}

trip = new Trip();



//Events
drawing.onload = function() {
   	ctx.drawImage(drawing,0,0, width, height);
   	UpdateCanvas(0);
};

slider.oninput = function() {
	ctx.drawImage(drawing,0,0, width, height);
 	UpdateCanvas(this.value/100);
}



//drawing points and lines 
function drawPoint(p) {
	ctx.beginPath();
	ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
}

function drawLine(p1, p2) {
	ctx.strokeStyle = "#FF0000";
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
}

function calculatePartialLine(p1, p2, lineRatioCompleted) {
	angle = Math.atan2( (p2.y - p1.y) , (p2.x - p1.x) );
	hyp = Math.sqrt( (p2.y - p1.y)**2 + (p2.x - p1.x)**2);

	point1 = p1;
	point2 = new Point(p1.x + Math.cos(angle)*hyp*lineRatioCompleted, p1.y + Math.sin(angle)*hyp*lineRatioCompleted);

	return [point1, point2];
}


function drawPath(points, includedPoints, pathRatioCompleted) {
	//pathRatioCompleted is a float [0, 1] that represents how much of the path to display. 
	const r = 1 / (points.length - 1)
	extraLength = ((pathRatioCompleted + 0.00001) % r) / r;   //+ 0.00001 is an ugly floating point hack

	for (var i = 0; i < includedPoints; i++) {
		drawPoint(points[i]);
	}

	for (var i = 0; i < includedPoints - 1; i++) {
		drawLine(points[i], points[i + 1]);
	}

	if (points.length != includedPoints) {
		ps = calculatePartialLine(points[includedPoints - 1], points[includedPoints], extraLength);
		drawLine(ps[0], ps[1]);
	}
	
}



//Info
function displayInfo(placeIndex){
	h1.innerHTML = trip.places[placeIndex].text;
}


function UpdateCanvas(ratioFromSlider) {
	points = trip.points;

	includedPoints = 1 + Math.floor(ratioFromSlider * (points.length - 1));

	drawPath(points, includedPoints, ratioFromSlider);
	displayInfo(includedPoints - 1);
}



