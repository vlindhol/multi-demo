import queryParsing from './queryParsing';
import { dispatchCommand } from './commands';
import { Repos } from '../repositories';

const servicesFactory = (repos: Repos) => ({
  queryParsing: queryParsing(repos),
  dispatchCommand,
});

export type Services = ReturnType<typeof servicesFactory>;
export default servicesFactory;
