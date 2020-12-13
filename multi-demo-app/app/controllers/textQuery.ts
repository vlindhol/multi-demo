import { Services } from '../services';

const textQueryControllers = (services: Pick<Services, 'queryParsing' | 'commands'>) =>
  ({
    parseAndRun: async (body: string): Promise<string> => {
      // This is such a simple API that we can do "manual" validation. Not advised for anything real though!
      const query = JSON.parse(body).query;
      if (!query || typeof query !== 'string') throw new Error('No query!');
      const command = await services.queryParsing.parseTextQuery(query);
      return services.commands.commandDispatch(command);
}});

export default textQueryControllers;
