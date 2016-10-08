var wpi = require('wiring-pi');

const pin = 17

wpi.setup('gpio');

wpi.pinMode(pin, wpi.OUTPUT);

buzzer();

function buzzer() {
  wpi.digitalWrite(pin, wpi.HIGH);
  setTimeout(function() {
    wpi.digitalWrite(pin, wpi.LOW);
    setTimeout(function() {
      buzzer()
    }, 50);
  }, 50);
}