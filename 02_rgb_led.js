var wpi = require('wiring-pi');

const pins = { 'pin_R':17, 'pin_G':18, 'pin_B':27 }

wpi.setup('gpio');

for (i in pins) {
  wpi.softPwmCreate(pins[i], 0, 100)
}

setColor();

function setColor() {
  setRGB(0xff,0x00,0x00)
  setTimeout(function() {
    setRGB(0x00,0xff,0x00)
    setTimeout(function() {
      setRGB(0x00,0x00,0xff)
      setTimeout(function() {
        setRGB(0xff,0xff,0x00)
        setTimeout(function() {
          setRGB(0xff,0x00,0xff)
          setTimeout(function() {
            setRGB(0xc0,0xff,0x3e)
            setTimeout(function() {
              setRGB(0x94,0x00,0xd3)
              setTimeout(function() {
                setRGB(0x76,0xee,0x00)
                setTimeout(function() {
                  setRGB(0x00,0xc5,0xcd)
                  setColor();
                }, 500)
              }, 500)
            }, 500)
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  }, 500)
}

function setRGB(r, g, b) {
  wpi.softPwmWrite(pins.pin_R, r)
  wpi.softPwmWrite(pins.pin_G, g)
  wpi.softPwmWrite(pins.pin_B, b)
}

