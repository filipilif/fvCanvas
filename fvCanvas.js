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
	
	// bresenham line
	this.line = function (x0, y0, x1, y1, content){
		var dx = Math.abs(x1-x0);
		var dy = Math.abs(y1-y0);
		var sx = (x0 < x1) ? 1 : -1;
		var sy = (y0 < y1) ? 1 : -1;
		var err = dx-dy;
		while(true){
			this.matrix[x0][y0] = content;
			if (Math.abs(x0-x1)<0.0001 && Math.abs(y0-y1)<0.0001) break;
			var e2 = 2*err;
			if (e2 > -dy){ err -= dy; x0  += sx; }
			if (e2 < dx){ err += dx; y0  += sy; }
		}
	}
	
	this.rect = function (x, y, x1, y1, content, filled) {
		if(filled) {
			for(var i = x; i <= x1; i++) {
				this.line(i, y, i, y1, content);
			}
		} else {
			this.line(1,1,1, this.width, content);
			this.line(1,this.width,this.height, this.width, content);
			this.line(1,1,this.height, 1, content);
			this.line(this.height, 1, this.height, this.width, content);
		}
	}
	
	this.text = function (x, y, text) {
		for(var i = 1; i <= text.length; i++) {
			this.matrix[x][y + i - 1] = text.charAt(i-1);
		}
	}
	
	this.circle = function(x , y , r, content, filled){
		
		this.matrix[x][y+r] = content;
		this.matrix[x][y-r] = content;
		this.matrix[x+r][y] = content;
		this.matrix[x-r][y] = content;
		
		var cx = r;
		var cy = 0;
		//init draw 4 points on top,right,left and bottom.    
		//init(ctx,x,y,r);

		//we only need to calculate 1/8 of the arcs, 
		//that is when angle = 45degree, cx = xy 
		while(cx > cy){
			if(cx*cx + cy*cy -r*r > 0){ // D(M) , if D(M) > 0, NW(x-1,y+1) is chooses
			  cx--;
			}
			cy++;

			//draw point and mirrow the points to other 7 places on circle
			//mirrowing(ctx,x,y,cx,cy);
			this.matrix[x+cx][y+cy] = content;
			this.matrix[x-cx][y+cy] = content;
			this.matrix[x+cx][y-cy] = content;
			this.matrix[x-cx][y-cy] = content;
			this.matrix[x+cy][y+cx] = content;
			this.matrix[x-cy][y+cx] = content;
			this.matrix[x+cy][y-cx] = content;
			this.matrix[x-cy][y-cx] = content;
			
			if(filled) {
				this.line(x+cx, y+cy, x+cx, y-cy, content);
				this.line(x-cx, y+cy, x-cx, y-cy, content);
				this.line(x+cy, y+cx, x+cy, y-cx, content);
				this.line(x-cy, y+cx, x-cy, y-cx, content);
				this.line(x, y-r, x, y+r, content);
			}
			
			
		}
	}
}
