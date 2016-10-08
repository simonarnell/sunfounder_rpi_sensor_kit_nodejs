var sensorLib = require('node-dht-sensor');

const dht11_pin = 17
const dht_type = 11;



var sensor = {
    initialize: function () {
        return sensorLib.initialize(dht_type, dht11_pin);
    },
    read: function () {
        var readout = sensorLib.read();
        var temp = readout.temperature.toFixed(2);
        var rh = readout.humidity.toFixed(2);
        var hi = fahrenheitToCelsius(calculateHeatIndex(celsiusToFahrenheit(temp), rh)).toFixed(2)
        console.log('Temperature: ' + temp  + 'C, ' +
            'humidity: ' + rh + '%, '  +
            'heat index: ' + hi + 'C') ;
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}

function celsiusToFahrenheit(celsiusTemp) {
  return (9/5) * celsiusTemp + 32
}

function fahrenheitToCelsius(fahrenheitTemp) {
  return (fahrenheitTemp - 32) * (5/9)
}

function calculateHeatIndex(fahrenheitTemp, relativeHumidity) {
  const c = [[-42.379, 0, 0], [2.04901523,1,0], [10.14333127,0,1], [-0.22475541,1,1], [-6.83783e-3,2,0], [-5.481717e-2, 0,2],[1.22874e-3,2,1], [8.5282e-4,1,2], [-1.99e-6, 2,2]]  // Heat Index Constants, Temparture exponent, Relative Humidity exponent
  var heatIndex = 0;
  
  for(var i = 0; i<c.length; i++) {
    hi += c[i][0] * Math.pow(fahrenheitTemp, c[i][1]) * Math.pow(relativeHumidity, c[i][2])
  }
  
  return heatIndex;
}