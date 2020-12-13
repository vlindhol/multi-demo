import { Services } from '../services';
import textQuery from './textQuery';

const controllersFactory = (services: Services) => ({
  textQuery: textQuery(services),
});

export type Controllers = ReturnType<typeof controllersFactory>;

export default controllersFactory;
