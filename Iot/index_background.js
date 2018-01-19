var canvas;
var symbolSize = 30;
var streams = [];

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function setup() { 
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1');
	var x = 0;
	for(i = 0; i <= width / symbolSize; i++){
		var stream = new Stream();
		stream.generateSymbols(x,random(-height,0));
		streams.push(stream);
		x += symbolSize;
	}
	textSize(symbolSize);
} 

function draw() { 
	background(0,200);
	streams.forEach(function(stream){
		stream.render();
	});
}

function Symbols(x,y,speed,first,last){
	
	this.speed = speed;
	this.x = x;
	this.y = y;
	this.value = 0;
	this.switchInterval = round(random(2,20));
	this.first = first;
	this.last = last;
	
	this.setRandomSymbols = function(){
		if(frameCount % this.switchInterval == 0){
			this.value = String.fromCharCode(
				0x0960 + round(random(6,15))
			);
		}
	}
	
	this.render = function(){
		
		text(this.value, this.x, this.y);
		this.setRandomSymbols();
		this.rain();
	}
	
	this.rain = function(){
		this.y = (this.y >= height) ? 0 : this.y += this.speed; 
	}

}

function Stream(){
	
	this.symbols = [];
	this.totalSymbols = round(random(5,20));
	this.streamSpeed = (random(5,10));
	
	this.generateSymbols = function(x,y){
		var first = true;
		var last = false;
		for(var i = 0; i <= this.totalSymbols; i++){
			var symbol = new Symbols(x,y,this.streamSpeed, first, last);
			symbol.setRandomSymbols();
			this.symbols.push(symbol);
			y -= symbolSize;
			first = false;
			if(i == this.totalSymbols - 1){
				last = true;
			}
		}
	}
	
	this.render = function(){
		this.symbols.forEach(function(symbol){
			if(symbol.first == true || symbol.last == true){
				fill(0,225,255);
			}
			else{
				fill(70, 173, 212);
			}
			text(symbol.value, symbol.x, symbol.y);
			symbol.setRandomSymbols();
			symbol.rain();
		});
	}
	
}