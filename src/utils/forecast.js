const request = require("postman-request");
const chalk = require("chalk");

const forecast = (latitude,longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=916ef445eea891b40a494d1d33c1b26a&query=" +
    latitude+','+longitude+'&units=f';

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback(
        chalk.red.inverse("Unable to connect to weather Service!"),
        undefined
      );
    } else if (body.error) {
      callback(chalk.green.inverse("Unable to find the location"), undefined);
    } else {
      const data = body.current;
      callback(undefined,` ${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out. The humidity is ${data.humidity} % .`);
      //   console.log(
      //     ` ${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out`
      //   );
    }
  });
};

module.exports = forecast;
