var c = document.getElementById("myCanvas");
var slider = document.getElementById("myRange");
slider.defaultValue = 0;
var ctx = c.getContext("2d");

const width = c.width;
const height = c.height;

drawing = new Image();
drawing.src = "kart.png";

drawing.onload = function() {
   	ctx.drawImage(drawing,0,0, width, height);
};

slider.oninput = function() {
	ctx.drawImage(drawing,0,0, width, height);
 	draw(this.value/100);
}

function Point(x, y) {
  	this.x = x;
  	this.y = y;
}

function drawLineBetweenPoints(p1, p2) {
	ctx.strokeStyle = "#FF0000";
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
}


function drawPoint(p) {
	ctx.beginPath();
	ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
}

function drawPartialLineBetweenPoints(p1, p2, relativeLength) {
	//angle = Math.atan( (p2.y - p1.y) / (p2.x - p1.x) );
	angle = Math.atan2( (p2.y - p1.y) , (p2.x - p1.x) );
	hyp = Math.sqrt( (p2.y - p1.y)**2 + (p2.x - p1.x)**2);

	ctx.strokeStyle = "#FF0000";
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p1.x + Math.cos(angle)*hyp*relativeLength, p1.y + Math.sin(angle)*hyp*relativeLength);
	ctx.stroke();
}


function drawPath(points, relativeLength) {
	includedPoints = 1 + Math.floor(relativeLength * (points.length - 1));

	const r = 1 / (points.length - 1)
	extraLength = (relativeLength % r) / r;

	for (var i = 0; i < includedPoints; i++) {
		drawPoint(points[i]);
	}
	for (var i = 0; i < includedPoints - 1; i++) {
		drawPartialLineBetweenPoints(points[i], points[i + 1], 1);
	}
	drawPartialLineBetweenPoints(points[includedPoints - 1], points[includedPoints], extraLength);

}


function draw(ratio) {
	var p1 = new Point(80, 630);
	var p2 = new Point(70, 600);
	var p3 = new Point(100, 560);
	var p4 = new Point(70, 450);
	var p5 = new Point(200, 200);
	var p6 = new Point(400, 100);


	points = [p1, p2, p3, p4, p5, p6];

	drawPath(points, ratio);
}



