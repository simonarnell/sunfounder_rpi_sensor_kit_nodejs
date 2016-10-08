var LCD = require('lcdi2c');
var lcd = new LCD( 1, 0x27, 16, 2);
lcd.clear();
lcd.println( 'Greetings!', 1 );
lcd.println( 'from SunFounder', 2 );