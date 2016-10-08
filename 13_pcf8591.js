var wpi = require('wiring-pi');

const pcf8591_pin = 120;
const pot_offset = 0;
const led_offset = 0;
const pcf8591_i2c_address = 0x48;

wpi.pcf8591Setup(pcf8591_pin, pcf8591_i2c_address);

setInterval(function() {
  var val = wpi.analogRead(pcf8591_pin + pot_offset)
  console.log(val);
  wpi.analogWrite(pcf8591_pin + led_offset, val);
}, 10)