import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import flaverr from 'flaverr';
import { Repos } from '../app/repositories';
import { WeatherResponse } from '../app/repositories/open-weather';
import { checkCityWeatherCommand } from '../app/services/commands';

chai.use(chaiAsPromised);

const expect = chai.expect;

const weatherResponseStub: WeatherResponse = {
  weather: [{
    description: 'raining cats and dogs',
  }],
  main: {
    temp: 12,
    feels_like: -1,
  },
};

const reposStub: Pick<Repos, 'openWeather'> = {
  openWeather: {
    getWeatherForCity: () => Promise.resolve(weatherResponseStub),
  },
};

const reposStubThrows: (err: any) => Pick<Repos, 'openWeather'> = (err) => ({
  openWeather: {
    getWeatherForCity: () => Promise.reject(err),
  }
})

describe('command objects', () => {
  describe('checkWeatherCommand', () => {
    it('should return the correct human-readable string with weather data for happy path', async () => {
      const city = 'Oslo';
      const cmd = checkCityWeatherCommand(reposStub, city);
      const expectedToIncludeCity = city;
      const expectedToIncludeWeather = weatherResponseStub.weather[0].description;
      const expectedToIncludeTemp = weatherResponseStub.main.temp;
      const expectedToIncludeTempFeelsLike = weatherResponseStub.main.feels_like;

      const actual = await cmd.run();

      expect(actual).to.include(expectedToIncludeCity);
      expect(actual).to.include(expectedToIncludeWeather);
      expect(actual).to.include(expectedToIncludeTemp);
      expect(actual).to.include(expectedToIncludeTempFeelsLike);
    });

    it('should return the correct human-readable string on connection error', async () => {
      const city = 'Oslo';
      const connectionErr = flaverr('CONNECTION_ERROR', new Error('foo'));
      const cmd = checkCityWeatherCommand(reposStubThrows(connectionErr), city);

      expect(cmd.run()).to.eventually.include('could not connect');
    });

    it('should return the correct human-readable string on parse error', async () => {
      const city = 'Oslo';
      const connectionErr = flaverr('PARSE_ERROR', new Error('foo'));
      const cmd = checkCityWeatherCommand(reposStubThrows(connectionErr), city);

      expect(cmd.run()).to.eventually.include('could not make sense');
    });

    it('should return the correct human-readable string on unknown error', async () => {
      const city = 'Oslo';
      const connectionErr = flaverr('ERROR_CODE_THAT_DOES_NOT_EXIST', new Error('foo'));
      const cmd = checkCityWeatherCommand(reposStubThrows(connectionErr), city);

      expect(cmd.run()).to.eventually.include('silly mistake');
    });
  });
});
