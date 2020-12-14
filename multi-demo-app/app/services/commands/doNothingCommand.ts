import { Command } from ".";

export const doNothingCommand = (query: string): Command => ({
  _name: 'DoNothing',
  run: () => `Got ${query}`,
});