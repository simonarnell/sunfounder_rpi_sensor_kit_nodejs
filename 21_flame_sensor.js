var wpi = require('wiring-pi');

wpi.setup('gpio');

const flame_sensor_pin = 17;
const pcf8591_pin = 120;
const pcf8591_pins = { 'AIN0': pcf8591_pin + 0 }
const pcf8591_i2c_address = 0x48;

wpi.pcf8591Setup(pcf8591_pin, pcf8591_i2c_address);

wpi.pinMode(flame_sensor_pin, wpi.INPUT);

var status = 0;
setInterval(function() {
  var tmp;
  var val = wpi.analogRead(pcf8591_pins.AIN0)

  console.log(val);
  
  tmp = wpi.digitalRead(flame_sensor_pin);
  if(tmp != status) {
    switch(tmp)
	{
      case 1:
        console.log("\n************");
		console.log("* Safe     *");
		console.log("************\n");
	    break;
	  case 0:
		console.log("\n***********");
		console.log("* Fire!   *");
		console.log("***********\n");
	    break;
	  default:
	 	console.log("\n**********************");
		console.log("* Print value error. *");
		console.log("**********************\n");
	    break;
    }
    status = tmp;
  }
}, 200)