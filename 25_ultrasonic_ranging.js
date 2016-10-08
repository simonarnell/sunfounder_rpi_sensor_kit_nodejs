var wpi = require('wiring-pi');
var NanoTimer = require('nanotimer');
var timer = new NanoTimer();

const pins = { 'trigger':17, 'echo':18 };
const c = 346.13; // speed of sound in air at 25°C

var start = [0,0];
var finish = [0,0];

wpi.setup('gpio');

wpi.pinMode(pins.trigger, wpi.OUTPUT);
wpi.pinMode(pins.echo, wpi.INPUT);
wpi.pullUpDnControl(pins.echo, wpi.PUD_UP);

function sendUltrasonicPulse() {
  start = [0,0];
  finish = [0,0]
  wpi.digitalWrite(pins.trigger, wpi.LOW);
  timer.setTimeout(function() {
    wpi.digitalWrite(pins.trigger, wpi.HIGH);
      timer.setTimeout(function() {
        wpi.digitalWrite(pins.trigger, wpi.LOW);
      },'', '2us', function(){
        timer.clearInterval();
      })
      },'', '2us', function(){
    timer.clearInterval();
  })
}

function convertNanoToSeconds(nanoTime) {
  var secondsTime = nanoTime / 1000 / 1000 / 1000;
  return secondsTime
}

function calculateDistance(roundTripTime, speedOfSound) {
  var timeToReflectionObstacle = roundTripTime / 2;
  var distance = speedOfSound * timeToReflectionObstacle
  return distance;
}

wpi.wiringPiISR(pins.echo , wpi.INT_EDGE_BOTH, function() {
  if(start[0] == 0 && start[1] == 0) {
    start = process.hrtime()
  }
  else if (finish[0] == 0 && finish[1] == 0) {
    finish = process.hrtime()
    var diff = [finish[0]-start[0],finish[1]-start[1]]
    console.log(calculateDistance(convertNanoToSeconds(diff[0] * 1e9 + diff[1]), c) + ' metres');
  }
});

setInterval(function() {
  sendUltrasonicPulse()
}, 1000);
 