var wpi = require('wiring-pi');

const pin = 17;
var counter = 0;

wpi.setup('gpio');

wpi.pinMode(pin, wpi.INPUT);
wpi.pullUpDnControl(pin, wpi.PUD_UP);

wpi.wiringPiISR(pin , wpi.INT_EDGE_FALLING, function() {
  console.log("Received infrared signal. Count = " + ++counter);
});
 