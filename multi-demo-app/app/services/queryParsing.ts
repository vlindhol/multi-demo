import { Repos } from "../repositories";
import { Command } from "./commands";
import { checkCityWeatherCommand } from "./commands/checkWeatherCommands";

export interface QueryParsingService {
  parseTextQuery: (query: string) => Promise<Command>;
}

type QueryParsingServiceFactory = (repos: Repos) => QueryParsingService;

const lexParserFactory: QueryParsingServiceFactory = (repos) => ({
  parseTextQuery: async (queryText) => {
    const lexResponse = await repos.lex.parseQuery(queryText);
    const understandError = new Error(lexResponse?.message ?? "I'm sorry, I didn't understand you. Try asking \"What's the weather like in Helsinki today?\"");
    if (lexResponse?.dialogState !== 'ReadyForFulfillment') {
      throw understandError;
    }
    switch (lexResponse.intentName) {
      case 'CheckWeather':
        if (lexResponse.slots['Location']) return checkCityWeatherCommand(repos, lexResponse.slots['Location']);
        else throw understandError;
      default:
        throw understandError;
    }
  }, 
})

export default lexParserFactory;
