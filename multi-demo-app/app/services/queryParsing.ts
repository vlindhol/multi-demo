import { Repos } from "../repositories";
import { Command, doNothingCommand } from "./commands";
import { checkCityWeatherCommand } from "./commands/checkWeatherCommand";

export interface QueryParsingService {
  parseTextQuery: (query: string) => Promise<Command>;
}

type QueryParsingServiceFactory = (repos: Repos) => QueryParsingService;

const naiveParserFactory: QueryParsingServiceFactory = (): QueryParsingService => ({
  parseTextQuery: (query) => Promise.resolve(doNothingCommand(query)),
});

const hardCodedParserFactory: QueryParsingServiceFactory = (repos) => ({
  parseTextQuery: () => Promise.resolve(checkCityWeatherCommand(repos, 'Helsinki')),
});

export default hardCodedParserFactory;
