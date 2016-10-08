var wpi = require('wiring-pi');

const pins = { 'switch':17, 'led_R':18, 'led_G':27 };

wpi.setup('gpio');

wpi.pinMode(pins.switch, wpi.INPUT);
wpi.pullUpDnControl(pins.switch, wpi.PUD_OFF);

wpi.pinMode(pins.led_R, wpi.OUTPUT);
wpi.pinMode(pins.led_G, wpi.OUTPUT);

var RG = false;

wpi.digitalWrite(pins.led_R, wpi.HIGH)
wpi.digitalWrite(pins.led_G, wpi.LOW)

wpi.wiringPiISR(pins.switch , wpi.INT_EDGE_BOTH, function() {
  RG = !RG;
  if(RG) {
    wpi.digitalWrite(pins.led_R, wpi.LOW)
    wpi.digitalWrite(pins.led_G, wpi.HIGH)
  } else {
    wpi.digitalWrite(pins.led_R, wpi.HIGH)
    wpi.digitalWrite(pins.led_G, wpi.LOW)
  } 
});
 