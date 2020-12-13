import { Command, doNothingCommand } from "./commands";

export interface QueryParsingService {
  parseTextQuery: (text: string) => Promise<Command>;
}

const naiveParser: QueryParsingService = {
  parseTextQuery: (query) => Promise.resolve(doNothingCommand(query)),
};

export default naiveParser;
