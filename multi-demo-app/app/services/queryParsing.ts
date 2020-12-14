import { Repos } from "../repositories";
import { Command } from "./commands";
import { checkCityWeatherCommand } from "./commands/checkWeatherCommands";

export interface QueryParsingService {
  parseTextQuery: (query: string) => Promise<Command>;
}

type QueryParsingServiceFactory = (repos: Repos) => QueryParsingService;

const hardCodedParserFactory: QueryParsingServiceFactory = (repos) => ({
  parseTextQuery: () => Promise.resolve(checkCityWeatherCommand(repos, 'Helsinki')),
});

export default hardCodedParserFactory;
