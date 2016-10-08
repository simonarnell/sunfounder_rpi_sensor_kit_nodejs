var wpi = require('wiring-pi');
wpi.setup('gpio');

const pins = { 'hall': 17, 'led_R': 18, 'led_G':27};

wpi.pinMode(pins.hall, wpi.INPUT);
wpi.pinMode(pins.led_R, wpi.OUTPUT);
wpi.pinMode(pins.led_G, wpi.OUTPUT);

wpi.digitalWrite(pins.led_G, wpi.HIGH)
wpi.digitalWrite(pins.led_R, wpi.LOW)

setInterval(function() {

  var val = wpi.digitalRead(pins.hall)
  if(val == wpi.LOW) {
    wpi.digitalWrite(pins.led_G, wpi.LOW)
    wpi.digitalWrite(pins.led_R, wpi.HIGH)
    console.log("Detected magnetic materials");
  } else {
    wpi.digitalWrite(pins.led_G, wpi.HIGH)
    wpi.digitalWrite(pins.led_R, wpi.LOW)
  }
}, 10)