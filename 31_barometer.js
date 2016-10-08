var BMP085 = require('bmp085'),
    barometer = new BMP085(
    {
        'mode': 1,
        'address': 0x77,
        'device': '/dev/i2c-1'
    }
);
 
barometer.read(function (data) {
    console.log("Temperature:", data.temperature);
    console.log("Pressure:", data.pressure);
});