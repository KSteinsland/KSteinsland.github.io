var canvas = document.getElementById("mapCanvas");
var ctx = canvas.getContext("2d");

const originalWidth = 1000;
const originalHeight = 800;

const width = canvas.width;
const height = canvas.height;

var slider = document.getElementById("mapRange");
slider.defaultValue = 0;

slider.oninput = function() {
	ctx.drawImage(mapImage,0,0, width, height);
 	UpdateCanvas(this.value/100);
}

/*
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      	x: evt.clientX - rect.left,
      	y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log("x: " + mousePos.x + ", y: " + mousePos.y);
}, false);
*/

mapImage = new Image();
mapImage.src = "images/map.png";
mapImage.onload = function() {
   	UpdateCanvas(0);
};


//Buss images
const bussRescaleFactor = width / 3000;

bussImage1 = new Image();
bussImage1.src = "images/buss1.png";
bussImage1.onload = function(){
	bussImage1.width = bussImage1.width*bussRescaleFactor;
	bussImage1.height = bussImage1.height*bussRescaleFactor;
};

bussImage2 = new Image();
bussImage2.src = "images/buss2.png";
bussImage2.onload = function(){
	bussImage2.width = bussImage2.width*bussRescaleFactor;
	bussImage2.height = bussImage2.height*bussRescaleFactor;
};

bussImage3 = new Image();
bussImage3.src = "images/buss3.png";
bussImage3.onload = function(){
	bussImage3.width = bussImage3.width*bussRescaleFactor;
	bussImage3.height = bussImage3.height*bussRescaleFactor;
};

bussImage4 = new Image();
bussImage4.src = "images/buss4.png";
bussImage4.onload = function(){
	bussImage4.width = bussImage4.width*bussRescaleFactor;
	bussImage4.height = bussImage4.height*bussRescaleFactor;
};

bussImages = [bussImage1, bussImage2, bussImage3, bussImage4];  


//Boat images
const boatRescaleFactor = bussRescaleFactor;

boatImage1 = new Image();
boatImage1.src = "images/boat1.png";
boatImage1.onload = function(){
	boatImage1.width = boatImage1.width*boatRescaleFactor;
	boatImage1.height = boatImage1.height*boatRescaleFactor;
};

boatImage2 = new Image();
boatImage2.src = "images/boat2.png";
boatImage2.onload = function(){
	boatImage2.width = boatImage2.width*boatRescaleFactor;
	boatImage2.height = boatImage2.height*boatRescaleFactor;
};

boatImage3 = new Image();
boatImage3.src = "images/boat3.png";
boatImage3.onload = function(){
	boatImage3.width = boatImage3.width*boatRescaleFactor;
	boatImage3.height = boatImage3.height*boatRescaleFactor;
};

boatImage4 = new Image();
boatImage4.src = "images/boat4.png";
boatImage4.onload = function(){
	boatImage4.width = boatImage4.width*boatRescaleFactor;
	boatImage4.height = boatImage4.height*boatRescaleFactor;
};

boatImages = [boatImage1, boatImage2, boatImage3, boatImage4];  




//strucutes
function Point(x, y) {
  	this.x = x;
  	this.y = y;
}


function Place(point, atSea, text, imgPath) {
	this.point = point;
	this.atSea = atSea;
	this.text = text;
	this.imgPath = imgPath;
}

function Trip(){
	this.places = [
		new Place(	new Point(443, 620), 
					false,
				 	"Stavanger",
				 	"images/stavanger.png"), 

		new Place(	new Point(432, 453), 
					false,
				 	"Bergen",
				 	"images/bergen.png"), 

		new Place(	new Point(505, 470),
					false,
				 	"Aga",
				 	"images/aga.png"), 

		new Place(	new Point(71, 484),
					true,
				 	"Shetland",
				 	"images/shetland.png"),

		new Place(	new Point(717, 77), 
					true,
				 	"Frosta",
				 	"images/frosta.png"),

		new Place(	new Point(439, 339), 
					false,
				 	"Gulen",
				 	"images/gulen.png"),  
	];
	this.points = [];
	for (var i = 0; i < this.places.length; i++) {
		//rescale according to canvas width
		this.places[i].point.x *= width / originalWidth;
		this.places[i].point.y *= height / originalHeight; 

		this.points.push(this.places[i].point);
	}

	
	
	this.placeImages = [];
	for (var i = 0; i < this.places.length; i++) {
		img = new Image();
		img.src = this.places[i].imgPath;
		this.placeImages.push(img);
	}

}

trip = new Trip();






//Drawing on canvas
function drawPoint(p) {
	ctx.beginPath();
	ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
}


function drawBuss(p, angle) {
	angle *= -1;

	//Calculate quadrant to select correct image
	if (Math.sin(angle) < 0) {
		if (Math.cos(angle) < 0) {
			ctx.drawImage(bussImages[2], p.x - bussImages[2].width/2, p.y - bussImages[2].height/2, bussImages[2].width, bussImages[2].height);
		}
		else {
			ctx.drawImage(bussImages[3], p.x - bussImages[3].width/2, p.y - bussImages[3].height/2, bussImages[3].width, bussImages[3].height)
		}
	}
	else {
		if (Math.cos(angle) < 0) {
			ctx.drawImage(bussImages[1], p.x - bussImages[1].width/2, p.y - bussImages[1].height/2, bussImages[1].width, bussImages[1].height);
		}
		else {
			ctx.drawImage(bussImages[0], p.x - bussImages[0].width/2, p.y - bussImages[0].height/2, bussImages[0].width, bussImages[0].height)
		}
	}
}

function drawBoat(p, angle) {
	angle *= -1;

	//Calculate quadrant to select correct image
	if (Math.sin(angle) < 0) {
		if (Math.cos(angle) < 0) {
			ctx.drawImage(boatImages[2], p.x - boatImages[2].width/2, p.y - boatImages[2].height/2, boatImages[2].width, boatImages[2].height);
		}
		else {
			ctx.drawImage(boatImages[3], p.x - boatImages[3].width/2, p.y - boatImages[3].height/2, boatImages[3].width, boatImages[3].height)
		}
	}
	else {
		if (Math.cos(angle) < 0) {
			ctx.drawImage(boatImages[1], p.x - boatImages[1].width/2, p.y - boatImages[1].height/2, boatImages[1].width, boatImages[1].height);
		}
		else {
			ctx.drawImage(boatImages[0], p.x - boatImages[0].width/2, p.y - boatImages[0].height/2, boatImages[0].width, boatImages[0].height)
		}
	}
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

	return [point1, point2, angle];
}

function displayInfo(placeIndex){
	const padding = 20; 
	ctx.drawImage(trip.placeImages[placeIndex], padding, padding, width - 2*padding, height - 2*padding);
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

	places = trip.places;
	const currentPlace = includedPoints;

	if (points.length != currentPlace) {
		ps = calculatePartialLine(points[currentPlace - 1], points[currentPlace], extraLength);
		drawLine(ps[0], ps[1]);

		if (places[currentPlace].atSea) {
			drawBoat(ps[1], angle);
		}
		else {
			drawBuss(ps[1], angle);
		}
	}

	if (extraLength < 0.15) {
		displayInfo(currentPlace - 1);
	}
}


function UpdateCanvas(ratioFromSlider) {
	ctx.drawImage(mapImage,0,0, width, height);

	points = trip.points;

	includedPoints = 1 + Math.floor(ratioFromSlider * (points.length - 1));

	drawPath(points, includedPoints, ratioFromSlider);
}



