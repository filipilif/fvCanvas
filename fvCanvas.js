// canvas object
function fvCanvas(id) {
	// render to this element
	this.element = document.getElementById(id);
	
	// constructor
	var __construct = function () {
		this.element = document.getElementById(id);
		
		// default
		this.element.innerHTML = 'fvCanvas';
	}();
	
	// this.element id
	this.id = id;
	
	// coords
	this.width = 100;
	this.height = 20;
	
	// chars used
	this.newline = '<br>';
	
	// 2D matrix with content of canvas. index from 1..
	this.matrix = [];
	
	// TODO: removable object shapes on canvas
	this.objects = [];
	
	// add object on canvas
	this.add = function (object) {
		this.objects.push(object);
	}
	
	// fill this.matrix with characters
	this.fill = function (fill) {
		// background
		for(var i = 1; i <= this.height; i++) { // foreach row
			this.matrix[i] = [];
			for(var j = 1; j <= this.width; j++) {
				
				this.matrix[i][j] = fill;
			}
		}
		
		
	}
	
	// render this.matrix to this.element
	this.render = function () {
		this.element.innerHTML = '';
		for(var i = 1; i <= this.height; i++) { // foreach row
			
			for(var j = 1; j <= this.width; j++) {
				this.element.innerHTML += this.matrix[i][j];
			}
			this.element.innerHTML += this.newline;
		}
		
	}
	
	this.line = function (){
		
	}
	
}