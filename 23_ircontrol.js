var wpi = require('wiring-pi');
var lirc_node = require('lirc_node');

const pins = { led_R: 17, led_G: 18, led_B: 27 };
const keymap =[
	"KEY_CHANNELDOWN",
	"KEY_CHANNEL",
	"KEY_CHANNELUP",
	"KEY_PREVIOUS",
	"KEY_NEXT",
	"KEY_PLAYPAUSE",
	"KEY_VOLUMEDOWN",
	"KEY_VOLUMEUP",
	"KEY_EQUAL",
	"KEY_NUMERIC_0",
	"BTN_0",
	"BTN_1",
	"KEY_NUMERIC_1",
	"KEY_NUMERIC_2",
	"KEY_NUMERIC_3",
	"KEY_NUMERIC_4",
	"KEY_NUMERIC_5",
	"KEY_NUMERIC_6",
	"KEY_NUMERIC_7",
	"KEY_NUMERIC_8",
	"KEY_NUMERIC_9"];
	
const luminance = { 'off':0xff, 'dim':0x44, 'bright':0x00 }; // Inverted due to common anode led.
var color = { 'red':0xff, 'green':0xff, 'blue':0xff };

wpi.setup('gpio');

wpi.softPwmCreate(pins.led_R, 0, 100);
wpi.softPwmCreate(pins.led_G, 0, 100);
wpi.softPwmCreate(pins.led_B, 0, 100);

function ledColorSet() {
  wpi.softPwmWrite(pins.led_R, color.red);
  wpi.softPwmWrite(pins.led_G, color.green);
  wpi.softPwmWrite(pins.led_B, color.blue);
}

function key(code) {
	var i, num;
	for (i=0; i<21; i++){
		if (code == keymap[i]){
			num = i;
			break;
		}
	}
	return num + 1;
}

function rgb(i) {
	switch(i){
		case 1: color.red   = luminance.off;    console.log("Red OFF");     break;
		case 2: color.red   = luminance.dim;    console.log("Dim Red");     break;
		case 3: color.red   = luminance.bright; console.log("Bright Red");    break;
		case 4: color.green = luminance.off;    console.log("Green OFF");   break;
		case 5: color.green = luminance.dim;    console.log("Dim Green"); break;
		case 6: color.green = luminance.bright; console.log("Bright Green");  break;
		case 7: color.blue  = luminance.off;    console.log("Blue OFF");    break;
		case 8: color.blue  = luminance.dim;    console.log("Dim Blue");  break;
		case 9: color.blue  = luminance.bright; console.log("Bright Blue");  break;
	}
}

lirc_node.init();
ledColorSet();

lirc_node.addListener(function(data) {
  rgb(key(data.key));
  ledColorSet();
  console.log("Received IR keypress '" + data.key + "' from remote '" + data.remote +"'");
});
 