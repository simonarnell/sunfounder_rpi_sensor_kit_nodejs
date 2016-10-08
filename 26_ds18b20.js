var W1Temp = require('w1temp')
var Promise = require("es6-promise").Promise;

W1Temp.setGpioData(4);

W1Temp.getSensorsUids().then(function (sensorUids) {
  console.log(sensorUids);
  console.log(sensorUids[0]);
  W1Temp.getSensor(sensorUids[0]).then(function (sensor) {
    var temp = sensor.getTemperature();
    console.log('Actual temp:', temp, '°C');
    sensor.on('change', function (temp) {
    console.log('Temp changed:', temp, '°C');
    });
  });
});

