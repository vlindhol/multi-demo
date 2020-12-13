import { Services } from '../services';

const textQueryControllersFactory = (services: Pick<Services, 'queryParsing' | 'dispatchCommand'>) =>
  ({
    post: async (body: string): Promise<string> => {
      // This is such a simple API that we can do "manual" validation. Not advised for anything real though!
      const query = JSON.parse(body).query;
      if (!query || typeof query !== 'string') throw new Error('No query!');
      const command = await services.queryParsing.parseTextQuery(query);
      return services.dispatchCommand(command);
}});

export default textQueryControllersFactory;
