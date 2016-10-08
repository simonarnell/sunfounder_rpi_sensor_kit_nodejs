var wpi = require('wiring-pi');

const pin = 17

wpi.setup('gpio');

wpi.pinMode(pin, wpi.OUTPUT);

relay();

function relay() {
  wpi.digitalWrite(pin, wpi.HIGH);
  setTimeout(function() {
    wpi.digitalWrite(pin, wpi.LOW);
    setTimeout(function() {
      relay()
    }, 500);
  }, 500);
}
