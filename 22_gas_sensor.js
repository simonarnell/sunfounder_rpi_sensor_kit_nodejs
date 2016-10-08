var wpi = require('wiring-pi');

wpi.setup('gpio');

const pins = { 'gas_sensor': 17, 'active_buzzer':18 };
const pcf8591_pin = 120;
const pcf8591_pins = { 'AIN0': pcf8591_pin + 0 }
const pcf8591_i2c_address = 0x48;

wpi.pcf8591Setup(pcf8591_pin, pcf8591_i2c_address);

wpi.pinMode(pins.gas_sensor, wpi.INPUT);
wpi.pinMode(pins.active_buzzer, wpi.OUTPUT);

wpi.digitalWrite(pins.active_buzzer, wpi.HIGH)

var status, count = 0;

setInterval(function() {
  var tmp;
  var val = wpi.analogRead(pcf8591_pins.AIN0)

  console.log(val);
  
  tmp = wpi.digitalRead(pins.gas_sensor);
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
  if(status == 0) {
    count++;
    if(count % 2 == 0)
      wpi.digitalWrite(pins.active_buzzer, wpi.HIGH)
    else
      wpi.digitalWrite(pins.active_buzzer, wpi.LOW)
  } else {
    count = 0;
    wpi.digitalWrite(pins.active_buzzer, wpi.HIGH);
  }
}, 200)