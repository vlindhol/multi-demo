import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import textQueryControllersFactory from '../app/controllers/textQuery';
import { Services } from '../app/services';
import { Command } from '../app/services/commands';

chai.use(chaiAsPromised);

const expect = chai.expect;

export const doNothingCommand = (query: string): Command => ({
  _name: 'DoNothing',
  run: () => `Got ${query}`,
});

const commandStub = doNothingCommand('stub');
const servicesStub: Pick<Services, 'queryParsing' | 'dispatchCommand'> = {
  queryParsing: {
    parseTextQuery: () => Promise.resolve(commandStub),
  },
  dispatchCommand: () => Promise.resolve('stub ok'),
};

describe('textQueryControllers', () => {
  describe('post', () => {
    it('should work for happy path', async () => {
      const controllers = textQueryControllersFactory(servicesStub);
      const expected = 'stub ok';

      const actual = await controllers.post('{"query": "foo"}');

      expect(actual).to.equal(expected);
    });

    it('should throw on non-JSON input', () => {
      const controllers = textQueryControllersFactory(servicesStub);

      const resultPromise = controllers.post('invalid json');
      expect(resultPromise).to.eventually.be.rejected;
    });

    it('should throw on non-string query', () => {
      const controllers = textQueryControllersFactory(servicesStub);

      const resultPromise = controllers.post('{"query": 42}');
      expect(resultPromise).to.eventually.be.rejected;
    });
  });
});