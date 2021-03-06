export { checkCityWeatherCommand } from './checkWeatherCommands';

export interface Command {
  _name: string; // Used for unit test assertions, don't use in production code! Follow the Command pattern!
  run: () => string | Promise<string>;
}

export const dispatchCommand = async (command: Command): Promise<string> => {
  try {
    return await command.run();
  } catch (e) {
    // commands are expected to *always* return a string, but we cannot enforce that in JS
    console.error('Command object threw an exception, this should never happen!', e);
    return 'I am sorry, it looks like some of my internal code is broken. It happens 😅';
  }
};
