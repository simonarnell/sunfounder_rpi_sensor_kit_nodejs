var wpi = require('wiring-pi');

const pins = { 'pin_R':17, 'pin_G':18 }

wpi.setup('gpio');

for (i in pins) {
  wpi.softPwmCreate(pins[i], 0, 100)
}

setColor();

function setColor() {
  wpi.softPwmWrite(pins.pin_R, 0xff)
  wpi.softPwmWrite(pins.pin_G, 0x00)
  setTimeout(function() {
    wpi.softPwmWrite(pins.pin_R, 0x00)
    wpi.softPwmWrite(pins.pin_G, 0xff)
    setTimeout(function() {
      wpi.softPwmWrite(pins.pin_R, 0xff)
      wpi.softPwmWrite(pins.pin_G, 0x45)
      setTimeout(function() {
        wpi.softPwmWrite(pins.pin_R, 0xff)
        wpi.softPwmWrite(pins.pin_G, 0xff)
        setTimeout(function() {
          wpi.softPwmWrite(pins.pin_R, 0x7c)
          wpi.softPwmWrite(pins.pin_G, 0x7c)
          setColor();
        }, 500)
      }, 500)
    }, 500)
  }, 500)
}



