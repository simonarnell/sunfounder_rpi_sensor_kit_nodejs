var wpi = require('wiring-pi');

const ir_obstacle_pin = 17;
var count = 0;
wpi.setup('gpio');

wpi.pinMode(ir_obstacle_pin, wpi.INPUT);
wpi.pullUpDnControl(ir_obstacle_pin, wpi.PUD_OFF);

wpi.wiringPiISR(ir_obstacle_pin , wpi.INT_EDGE_FALLING, function() {
  count++;
  console.log(count + ' obstacle(s) detected');
});
 