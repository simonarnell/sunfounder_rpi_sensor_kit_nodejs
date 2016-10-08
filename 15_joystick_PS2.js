var wpi = require('wiring-pi');

const pcf8591_pin = 120;
const pcf8591_pins = { 'AIN0': pcf8591_pin + 0, 'AIN1': pcf8591_pin + 1, 'AIN2':   pcf8591_pin + 2}
const pcf8591_i2c_address = 0x48;

const state = [ "home", "up", "down", "left", "right", "pressed"];

wpi.pcf8591Setup(pcf8591_pin, pcf8591_i2c_address);

var tmp;
var status = 0;

function direction() {

	var x, y, b; 
	var tmp = 0;
	x = wpi.analogRead(pcf8591_pins.AIN1);
	y = wpi.analogRead(pcf8591_pins.AIN0);
	b = wpi.analogRead(pcf8591_pins.AIN2);
	if (y == 0)
		tmp = 1;		// up
	if (y == 255)
		tmp = 2;		// down
	if (x == 255)
		tmp = 3;		// left
	if (x == 0)
		tmp = 4;		// right
	if (b == 0)
		tmp = 5;		// button preesd
	if (x-125<15 && x-125>-15 && y-125<15 && y-125>-15 && b == 255)
		tmp = 0;		// home position
	
	return tmp;

}

setInterval(function() {

    tmp = direction();
    if (tmp != status)
		{
			console.log(state[tmp]);
			status = tmp;
		}
	
}, 10)