var wpi = require('wiring-pi');

wpi.setup('gpio');

const hall_pin = 17;
const pcf8591_pin = 120;
const pcf8591_pins = { 'AIN0': pcf8591_pin + 0 }
const pcf8591_i2c_address = 0x48;

wpi.pcf8591Setup(pcf8591_pin, pcf8591_i2c_address);

wpi.pinMode(hall_pin, wpi.INPUT);
wpi.pullUpDnControl(hall_pin, wpi.PUD_UP);

wpi.wiringPiISR(hall_pin, wpi.INT_EDGE_RISING, function() {
  console.log("\n*************************************");
  console.log("* Digital Out: South Pole detected. *");
  console.log("*************************************\n");
});

var status;
setInterval(function() {
  var tmp;
  var val = wpi.analogRead(pcf8591_pins.AIN0)
  console.log("Current intensity of magnetic field : " + val);
  if(val - 133 < 5 || val - 133 > 5)
    tmp = 5;
  else if(val < 128)
    tmp = -1;
  else if(val > 128)
    tmp = 1;
  if(tmp != status) {
  			switch(tmp)
			{
				case 0:
					console.log("\n*****************");
					console.log("* Magnet: None. *");
					console.log("*****************\n");
					break;
				case -1:
					console.log("\n******************");
					console.log("* Magnet: North. *");
					console.log("******************\n");
					break;
				case 1:
					console.log("\n******************");
					console.log("* Magnet: South. *");
					console.log("******************\n");
					break;
			}
			status = tmp;
  }
}, 200)