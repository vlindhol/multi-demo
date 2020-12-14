import * as openWeather from './open-weather';

const repos = {
  openWeather,
};

export type Repos = typeof repos;
export default repos;