import fetch from 'node-fetch';
import flaverr from 'flaverr';

const openWeatherApiToken = process.env.OPEN_WEATHER_TOKEN;

export interface WeatherResponse {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
  }
}

const verifyValidWeatherResponse = (r: any): r is WeatherResponse => {
  return typeof r?.weather?.[0]?.description === 'string'
    && typeof r?.main?.temp === 'number'
    && typeof r?.main?.feels_like === 'number';
};

const connectionError = flaverr('CONNECTION_ERROR', new Error('Could not connect to the weather service'));
const parseError = flaverr('PARSE_ERROR', new Error('Could not make sense of the data returned by the weather service'));

export const getWeatherForCity = async (city: string): Promise<WeatherResponse> => {
  let responseJson: unknown;
  try {
    if (!openWeatherApiToken) throw new Error('No API token defined for the OpenWeather service');
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&appid=${openWeatherApiToken}`);
    if (!response.ok) throw new Error(`Got HTTP status ${response.status} when calling https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&appid=*****`);
    responseJson = await response.json();
  } catch (err) {
    console.error('Error in getWeatherForCity:', err.message);
    throw connectionError;
  }
  if (verifyValidWeatherResponse(responseJson)) return responseJson;
  throw parseError;
};