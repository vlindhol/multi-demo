import queryParsing from './queryParsing';
import { dispatchCommand } from './commands';

const services = {
  queryParsing,
  dispatchCommand,
};

export type Services = typeof services;
export default services;
