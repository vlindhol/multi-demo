import { Command } from ".";

export const doNothingCommand = (query: string): Command => ({
  run: () => `Got ${query}`,
});