/*window.requestAnimationFrame = method to help us execute animation related JavaScript code that make changes to the user's screen, !window.requestAnimationFrame means if window.requestAnimationFrame ==0*/

if ( !window.requestAnimationFrame ) {
 
    window.requestAnimationFrame = ( function() {
 
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
            window.setTimeout( callback, 1000 / 60 );
			/*60 fps*/
 
        };
 
    } )();
 
}



var ball;//ball div in the html
var w; //window.innerWidth;
var h; //window.innerHeight
var cnv;
var canvas;
var iW = window.innerWidth;//screen width
var iH = window.innerHeight;//screen height
var target;
var xPos;
var yPos;
var obsx = Math.random()*(iW - 40);
var obsy = Math.random()*(iH - 40);
var obss = Math.random()*40+40;//size
var winx = Math.random()*(iW - 20);
var winy = Math.random()*(iH - 40);
var wins = Math.random()*20+20;
var hasWon = false;
var hasLost = false;

function init()
{
    ball = document.getElementById("ball");
	 w = window.innerWidth;
     h = window.innerHeight;
	
	canvas= document.getElementById('myCanvas');
    cnv = canvas.getContext("2d");/* The HTML5 <canvas> tag is used to draw graphics, on the fly, via scripting (usually JavaScript).

However, the <canvas> element has no drawing abilities of its own (it is only a container for graphics) - you must use a script to actually draw the graphics.

The getContext() method returns an object that provides methods and properties for drawing on the canvas.The getContext() method returns an object that provides methods and properties for drawing on the canvas.*/
    cnv.canvas.width = iW;
    cnv.canvas.height = iH-40;//We subtract 40 from the height to allow for the output bar we’ve already created at the bottom of the display. 
	alert("the canvas width is " + iW + " the canvas height is " + iH);
	
	ball.velocity = {x:0,y:0}
	ball.position = {x:0,y:0}
	
	//target
	
	target = new Image(); //The Image() constructor creates a new HTMLImageElement instance.
                target.src = "images/transparent.png";
                xPos = (iW-target.width)/2;//this puts the target or player in the middle of the canvas
                yPos = (iH-target.height)/2;//this puts the target or player in the middle of the canvas
				
				 target.onload = function()
                {
                    cnv.drawImage(target, xPos, yPos);//puts the target onto the canvas
					cnv.fillStyle = "#3Dcc21";
					cnv.fillRect(obsx,obsy,obss,obss);//applies fill to obsticle
					cnv.fillRect(winx,winy,wins,wins);//applies fill to win rectangle
					
						
                }
    
    if (window.DeviceOrientationEvent) {
		
		window.addEventListener("deviceorientation", function(event) 
		{
			/*The orientation event contains four values:

DeviceOrientationEvent.absolute
DeviceOrientationEvent.alpha
DeviceOrientationEvent.beta
DeviceOrientationEvent.gamma

The DeviceOrientationEvent.beta value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device.
The DeviceOrientationEvent.gamma value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device.*/
			ball.velocity.y = Math.round(event.beta);
			ball.velocity.x = Math.round(event.gamma);
        }
                               )
    }
    else {
  	alert("Sorry, your browser doesn't support Device Orientation");
	} ;
    
    update();
}

function update() {
	if (!(hasLost==true || hasWon==true)){
        ball.position.x += ball.velocity.x;
        ball.position.y += ball.velocity.y;
        //keeps the ball within the canvas
		//w = width of canvas
		//ball width and height is 100
        if(ball.position.x > (w-100) && ball.velocity.x > 0)
			{
			   ball.position.x = w-100;
			}
			
			if(ball.position.x < 0 && ball.velocity.x < 0)
			{
				ball.position.x = 0;
			}
			
			if(ball.position.y > (h-100) && ball.velocity.y > 0)
			{
			   ball.position.y = h-100;
			}
			
			if(ball.position.y < 0 && ball.velocity.y < 0)
			{
			   ball.position.y = 0;
			}
    //this will show the xy corordinates in the ooutput element
		//.style.top returns the top position
		//style.left returns the left position
    ball.style.top = ball.position.y + "px";
        ball.style.left = ball.position.x + "px";
		
		document.getElementById('outX').innerHTML = "X:" + ball.position.x ;
        document.getElementById('outY').innerHTML = "<br/>Y:" + ball.position.y;
		//this os the positioning of the target
		//it makes sure that our target stays within the canvas constrains
	if (xPos > canvas.width - 91) {
					xPos= canvas.width-91;
					
				}
				if (xPos < 0){
					xPos = 0;
					
				}
				
				if (yPos > canvas.height - 91) {
					xPos = xPos;
					yPos= canvas.height-91;
				}
				
				if (yPos < 0){
				yPos = 0;
				}
               
				//this is the collision detection
				if (ball.position.x < obsx + obss &&
				   ball.position.x + (50) > obsx &&
				   ball.position.y < obsy + obss &&
				   (50) + ball.position.y > obsy) {
						hasLost = true;
						alert("ding");
					location.reload();
					
				}
				if (ball.position.x < winx + wins &&
				   ball.position.x + (50) > winx &&
				   ball.position.y < winy + wins &&
				   (50) + ball.position.y > winy) {
						hasWon = true;
						alert("win");
					location.reload();
				}
                
	}
    requestAnimationFrame( update );//KEEP ANIMATING
}
