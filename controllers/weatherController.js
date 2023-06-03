const axios = require("axios");
const { kelvinToCelsius } = require("../helper/kelvinToCelcius");
require("dotenv").config();

module.exports = {
  getWeather: async (req, res, next) => {
    try {
      // FOR QUERY BODY
      const city = req.query.q;

      // if query city null or empty, throw error
      if (!city) {
        throw { name: "city required" };
      }

      // key for open weather api map
      const apiKey = process.env.WEATHER_KEY;

      // url to open weather map
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}`;

      // axios to connect
      const axiosResponse = await axios.get(url);

      // if connection axios erro, throw error
      if (!axiosResponse || axiosResponse.data.cod !== 200) {
        throw { name: "axios weather failed" };
      }

      // convert temprature from kelvin to celcius
      const temperature = kelvinToCelsius(axiosResponse.data.main.temp).toFixed(
        1
      );
      const minTemperature = kelvinToCelsius(
        axiosResponse.data.main.temp_min
      ).toFixed(1);
      const maxTemperature = kelvinToCelsius(
        axiosResponse.data.main.temp_max
      ).toFixed(1);

      // response object
      const response = {
        main_weather: axiosResponse.data.weather[0].main,
        description: axiosResponse.data.weather[0].description,
        temperature: temperature,
        minTemperature: minTemperature,
        maxTemperature: maxTemperature,
        windSpeed: axiosResponse.data.wind.speed,
        clouds: axiosResponse.data.clouds.all,
        message: `the weather in ${city} is ${axiosResponse.data.weather[0].description}.With a temprature of ${temperature}°C, min temprature is ${minTemperature} and max temprature is ${maxTemperature}.Wind speed is ${axiosResponse.data.wind.speed}m/s and cloud coverage is ${axiosResponse.data.clouds.all}%`,
      };

      return res.status(200).json({
        status: true,
        data: response,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        error.name = "invalid api key";
        next(error);
        return;
      }
      if (error.response && error.response.status === 404) {
        error.name = "city not found";
        next(error);
        return;
      }
      next(error);
    }
  },
};
