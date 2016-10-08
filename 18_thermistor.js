var wpi = require('wiring-pi');

wpi.setup('gpio');

const thermistor_pin = 17;
const pcf8591_pin = 120;
const pcf8591_pins = { 'AIN0': pcf8591_pin + 0 }
const pcf8591_i2c_address = 0x48;

const vcc = 3.3;
const steps = Math.pow(2,8) - 1; // 8-bit ADC
const resistor = 10000;
const absoluteZero = -273.15
const betaCoefficent = 3950
const nominalTempature = 25

wpi.pcf8591Setup(pcf8591_pin, pcf8591_i2c_address);

wpi.pinMode(thermistor_pin, wpi.INPUT);

function getVoltage(analogValue) {
  return vcc * analogValue / steps
}

function getResistance(voltage) {
  return resistor * (voltage / (vcc - voltage))
}

function getTemperatureKelvins(resistance) {
  return 1 / (((Math.log(resistance/resistor)) / betaCoefficent )+( 1 / (nominalTempature - absoluteZero)))
}

function getTemperatureCelsius(tempatureKelvin) {
  return tempatureKelvin + absoluteZero;
}

var status;
setInterval(function() {
  var tmp;
  var val = wpi.analogRead(pcf8591_pins.AIN0)
  var temp = getTemperatureCelsius(getTemperatureKelvins(getResistance(getVoltage(val))));

  console.log("Current temperature : " + temp + "°C");
  
  		// For a threshold, uncomment one of the code for
		// which module you use. DONOT UNCOMMENT BOTH!
		//---------------------------------------------
		// 1. For Analog Temperature module(with DO)
		tmp = wpi.digitalRead(thermistor_pin);

        // 2. For Thermister module(with sig pin)
        // if (temp > 33) tmp = 0;
        // else if (temp < 31) tmp = 1;
		//---------------------------------------------
  
  if(tmp != status) {
    switch(tmp)
	{
      case 0:
        console.log("\n************");
		console.log("* Too Hot! *");
		console.log("************\n");
	    break;
	  case 1:
		console.log("\n***********");
		console.log("* Better~ *");
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