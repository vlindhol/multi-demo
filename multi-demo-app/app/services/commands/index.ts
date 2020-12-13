export { doNothingCommand } from './doNothingCommand';

export interface Command {
  run: () => string | Promise<string>;
}

export const commandDispatch = async (command: Command): Promise<string> => {
  return await command.run();
};
