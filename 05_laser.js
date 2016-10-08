var wpi = require('wiring-pi');

const pin = 17

wpi.setup('gpio');

wpi.pinMode(pin, wpi.OUTPUT);

laser();

function laser() {
  wpi.digitalWrite(pin, wpi.HIGH);
  setTimeout(function() {
    wpi.digitalWrite(pin, wpi.LOW);
    setTimeout(function() {
      laser()
    }, 50);
  }, 50);
}
