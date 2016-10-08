var wpi = require('wiring-pi');

wpi.setup('gpio');

const pins = { 'pcf8591':120, 'lm363_digital':17 }

const lm363_offset = 0;
const pcf8591_i2c_address = 0x48;

wpi.pcf8591Setup(pins.pcf8591, pcf8591_i2c_address);
wpi.pinMode(pins.lm363_digital, wpi.INPUT);

var status = wpi.LOW;

setInterval(function() {
  var val = wpi.analogRead(pins.pcf8591 + lm363_offset)
  console.log(val);
  tmp = wpi.digitalRead(pins.lm363_digital)
  if(tmp != status) {
    printStatus(tmp);
    status = tmp;
  }
}, 200)

function printStatus(status) {
  switch(status) {
    case wpi.HIGH:
      console.log("\n***************");
      console.log("* Not Raining *");
      console.log("***************\n");
      break;
    case wpi.LOW:
	  console.log("\n*************");
	  console.log("* Raining!! *");
	  console.log("*************\n");
	  break;
	default:
	  console.log("\n**********************");
	  console.log("* Print value error. *");
	  console.log("**********************\n");
	  break;
  }
}