var wpi = require('wiring-pi');

const pin = 17

const CL1 =  131
const CL2 = 147
const CL3 = 165
const CL4 = 175
const CL5 = 196
const CL6 = 221
const CL7 = 248

const CM1 = 262
const CM2 = 294
const CM3 = 330
const CM4 = 350
const CM5 = 393
const CM6 = 441
const CM7 = 495

const CH1 = 525
const CH2 = 589
const CH3 = 661
const CH4 = 700
const CH5 = 786
const CH6 = 882
const CH7 = 990

var song_1 = [CM3,CM5,CM6,CM3,CM2,CM3,CM5,CM6,CH1,CM6,CM5,CM1,CM3,CM2,
				CM2,CM3,CM5,CM2,CM3,CM3,CL6,CL6,CL6,CM1,CM2,CM3,CM2,CL7,
				CL6,CM1,CL5];

var beat_1 = [1,1,3,1,1,3,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,2,1,1,
				1,1,1,1,1,1,3];


var song_2 = [CM1,CM1,CM1,CL5,CM3,CM3,CM3,CM1,CM1,CM3,CM5,CM5,CM4,CM3,CM2,
				CM2,CM3,CM4,CM4,CM3,CM2,CM3,CM1,CM1,CM3,CM2,CL5,CL7,CM2,CM1
				];

var beat_2 = [1,1,1,3,1,1,1,3,1,1,1,1,1,1,3,1,1,1,2,1,1,1,3,1,1,1,3,3,2,3];

var playing = true;

wpi.setup('gpio');

wpi.softToneCreate(pin);

buzzer();

function buzzer() {
  var duration = 0;
  for(var i = 0; i < song_1.length; i++) {
    duration += beat_1[i]*500
  } 
  duration += 2000;
  playTone(song_1, beat_1, 0);
  setTimeout(function() {
    playTone(song_2, beat_2, 0);
  }, duration)
}

function playTone(song, beat, tone) {
    playing = true;
    wpi.softToneWrite(pin, song[tone])
    if(tone < (song.length - 1)) {
      setTimeout(function() {
        playTone(song, beat, tone + 1)
      }, beat[tone]*500);
    } else {
      wpi.softToneWrite(pin, 0);
    }
}