import { Command } from ".";
import { Repos } from "../../repositories";

export const checkCityWeatherCommand: (repos: Repos, city: string) => Command = (repos, city) => ({
  _name: 'CheckCityWeather',
  run: async () => {
    try {
      const result = await repos.openWeather.getWeatherForCity(city);
      return `The weather in ${city} can only be described as: ${result.weather.description}. The temperature is ${result.main.temp}°C but it feels like ${result.main.feels_like}°C.`;
    } catch (e) {
      let errMsg: string;
      switch (e.code) {
        case 'CONNECTION_ERROR':
          errMsg = 'I could not connect to the weather service.';
          break;
        case 'PARSE_ERROR':
          errMsg = 'I could not make sense of the data returned by the weather service.';
          break;
        default:
          errMsg = 'The person who coded me must have made a silly mistake somewhere.'
      }
      return `I'm sorry, something went wrong. ${e.message}`;
    }
  },
});