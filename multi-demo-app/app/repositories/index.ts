import * as openWeather from './open-weather';
import * as lex from './lex';

const repos = {
  openWeather,
  lex,
};

export type Repos = typeof repos;
export default repos;