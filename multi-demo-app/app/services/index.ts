import queryParsing from './queryParsing';
import * as commands from './commands';

const services = {
  queryParsing,
  commands,
};

export type Services = typeof services;
export default services;
