var wpi = require('wiring-pi');

const pins = { 'touch_switch':17, 'led_R':18, 'led_G':27 };

wpi.setup('gpio');

wpi.pinMode(pins.touch_switch, wpi.INPUT);
wpi.pullUpDnControl(pins.touch_switch, wpi.PUD_UP);

wpi.pinMode(pins.led_R, wpi.OUTPUT);
wpi.pinMode(pins.led_G, wpi.OUTPUT);

var RG = false;

wpi.digitalWrite(pins.led_R, wpi.HIGH)
wpi.digitalWrite(pins.led_G, wpi.LOW)

wpi.wiringPiISR(pins.touch_switch , wpi.INT_EDGE_BOTH, function() {
  RG = !RG;
  if(RG) {
    wpi.digitalWrite(pins.led_R, wpi.LOW)
    wpi.digitalWrite(pins.led_G, wpi.HIGH)
  } else {
    wpi.digitalWrite(pins.led_R, wpi.HIGH)
    wpi.digitalWrite(pins.led_G, wpi.LOW)
  } 
});
 