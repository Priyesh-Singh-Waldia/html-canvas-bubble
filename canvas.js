let canvas = document.querySelector("canvas");
//to scale it according to the windows / display size.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//⭐ RECTANGLE / SQUARE
let c = canvas.getContext("2d");

// canvas.getCOntext("2d").fillRect(x,y,width,height);
//c.fillStyle to fill color preceding the drawn element
/*
c.fillStyle = "rgba(255,0,0, 0.4)";
c.fillRect(500, 100, 100, 100);
c.fillStyle = "rgba(0,255,0, 0.6)";
c.fillRect(600, 300, 50, 50);
c.fillStyle = "rgba(0,0,255, 0.4)";
c.fillRect(400, 500, 80, 80);
*/

/*
//⭐ LINES
// c.beginPath(); to make it a seperate element
// c.moveTo(x,y); moveTo used to create a starting point
//point is invisible until stroke method is used.
// lineTo is used to make a point to from the moveTo

//strokeStyle to color lines
//c.fillStyle to fill color
c.beginPath(); //to make it a seperate element
c.moveTo(50, 300); //create first dot
c.lineTo(300, 100); //create first line
c.lineTo(500, 300); //create second line
// c.lineTo(50, 300); //create third line
c.strokeStyle = "red"; //don't forget the inverted commas
c.stroke();
*/
/*
//⭐ ARC /CIRCLE
//c.arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined): void
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = "blue";
c.stroke();
*/
/*
//⭐ USING FOR LOOPS TO CREATE MULTIPLE CIRCLES
for (let i = 0; i < 100; i++) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.strokeStyle = "orange";
  c.stroke();
}
*/

//⭐ EVENT LISTENER

let mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 40;
let minRadius = 2;

let colorArray = ["#292F36", "#4ECDC4", "#FAFF81", "#FF6B6B", "#FEEFE5"];

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x; // get x cordinate
  mouse.y = event.y; // get y cordinate
});
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

//⭐ ANIMATION
//c.clearRect(x: number, y: number, w: number, h: number): void;  to clear the element created

function Circle(x, y, velocityX, velocityY, radius) {
  this.x = x;
  this.y = y;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.velocityX = -this.velocityX;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.velocityY = -this.velocityY;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

let circleArray = []; //store created circle inside the array

// to make it so that the circles doesn't get caught in the edges of the screen = Math.random() * (window.innerHeight - radius * 2) + radius;

function init() {
  circleArray = [];

  for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let velocityX = (Math.random() - 0.5) * 1;
    let velocityY = (Math.random() - 0.5) * 1;

    circleArray.push(new Circle(x, y, velocityX, velocityY, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();

animate();
