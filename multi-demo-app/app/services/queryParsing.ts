import { Command, doNothingCommand } from "./commands";

export interface QueryParsingService {
  parseTextQuery: (text: string) => Promise<Command>;
}

const naiveParser: QueryParsingService = {
  parseTextQuery: () => Promise.resolve(doNothingCommand),
};

export default naiveParser;
