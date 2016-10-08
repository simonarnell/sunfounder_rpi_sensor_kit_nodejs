var wpi = require('wiring-pi');
wpi.setup('gpio');

const pins = { 'channel_A':17, 'channel_B':18, 'switch':27 };
const states = { 'stationary':0, 'clockwise':1, 'counterclockwise':2 }

wpi.pinMode(pins.channel_A, wpi.INPUT);
wpi.pinMode(pins.channel_B, wpi.INPUT);
wpi.pinMode(pins.switch, wpi.INPUT);
wpi.pullUpDnControl(pins.switch, wpi.PUD_UP);

var counter = 0; 
var tmp = 0;
var previousChannelARead = wpi.LOW

wpi.wiringPiISR(pins.switch , wpi.INT_EDGE_FALLING, function() {
  counter = 0;
  console.log(counter);
});

setInterval(function () {
  tmp = counter;
  var currentChannelARead = wpi.digitalRead(pins.channel_A);
  var state = states.stationary;
  if((previousChannelARead == wpi.LOW) && (currentChannelARead == wpi.HIGH)) {
    if(wpi.digitalRead(pins.channel_B) == wpi.LOW) {
      state = states.counterclockwise;
    } else {
      state = states.clockwise;
    }
  }
  previousChannelARead = currentChannelARead;
  switch(state)
  {
    case states.stationary:
      break;
    case states.clockwise:
      counter++;
      break;
    case states.counterclockwise:
      counter--;
      break;
    default:
      break;
  }
  if(tmp != counter) {
    console.log(counter);
  }
}, 1);