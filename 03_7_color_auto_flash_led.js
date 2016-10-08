var wpi = require('wiring-pi');

const pin = 17

wpi.setup('gpio');

wpi.pinMode(pin, wpi.OUTPUT);

wpi.digitalWrite(pin, wpi.HIGH);