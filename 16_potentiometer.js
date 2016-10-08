var wpi = require('wiring-pi');

const pcf8591_pin = 120;
const pcf8591_pins = { 'AIN0': pcf8591_pin + 0, 'AOUT': pcf8591_pin + 0};
const pcf8591_i2c_address = 0x48;

wpi.pcf8591Setup(pcf8591_pin, pcf8591_i2c_address);

setInterval(function() {

  var val = wpi.analogRead(pcf8591_pins.AIN0)
  console.log("Value: " + val);
  wpi.analogWrite(pcf8591_pins.AOUT, val)
  
}, 200)