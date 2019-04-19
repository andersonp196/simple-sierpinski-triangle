//graphic variables
const dotRad = 2;
const dotMove = 2;
const cycleMS = 10;
const dotColor = 'random';

const can = document.getElementById('ctx');
const ctx = can.getContext('2d');
ctx.canvas.width  = window.innerWidth-15;
ctx.canvas.height = window.innerHeight-15;
const canw = can.width;
const canh = can.height;
ctx.font = '18px Arial';

ctx.beginPath();
ctx.rect(0, 0, canw, canh);
ctx.fillStyle = 'coral';
ctx.fill();

function randColor() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

function drawCircle(x, y, rad, color) {
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, 2*Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function randCirc() {
  var randx = randInt(0, (canw+1));
  var randy = randInt(0, (canh+1));
  return [randx, randy];
}

function getDist(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.sqrt( a*a + b*b );
}

var tri1;
var tri2;
var tri3;
while (1) {
  tri1 = randCirc();
  tri2 = randCirc();
  tri3 = randCirc();
  var triArea = Math.abs(tri1[0]*(tri2[1]-tri3[1]) + tri2[0]*(tri3[1]-tri1[1]) + tri3[0]*(tri1[1]-tri2[1]))/2
  if (triArea > 200000) {
    drawCircle(tri1[0], tri1[1], 4, 'blue');
    drawCircle(tri2[0], tri2[1], 4, 'blue');
    drawCircle(tri3[0], tri3[1], 4, 'blue');
    break;
  }
}

var lastx = tri1[0];
var lasty = tri1[1];
var dots = 0;
setInterval(function() {
  const point = randInt(1,4);
  var newx;
  var newy;
  if (point == 1) {
    newx = (lastx+tri1[0])/dotMove;
    newy = (lasty+tri1[1])/dotMove;
  }else if(point == 2) {
    newx = (lastx+tri2[0])/dotMove;
    newy = (lasty+tri2[1])/dotMove;
  }else {
    newx = (lastx+tri3[0])/dotMove;
    newy = (lasty+tri3[1])/dotMove;
  }
  if (dotColor == 'random') {
    drawCircle(newx, newy, dotRad, randColor());
  }else {
    drawCircle(newx, newy, dotRad, dotColor);
  }
  lastx = newx;
  lasty = newy;

  dots++;
  ctx.fillStyle = 'blue';
  ctx.fillRect(canw-100, 0, 150, 30);
  ctx.fillStyle = 'black';
  ctx.textAlign = 'right';
  ctx.fillText(('Dots:'+dots), canw-5, 20);
}, cycleMS);
