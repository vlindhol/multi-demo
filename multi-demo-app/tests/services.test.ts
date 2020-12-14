import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { Command, dispatchCommand } from '../app/services/commands';

chai.use(chaiAsPromised);

const expect = chai.expect;

const commandStub: (retValue: string) => Command = (retValue) => ({
  _name: 'CommandStub',
  run: () => Promise.resolve(retValue),
});

const commandStubThrows: (err: any) => Command = (err) => ({
  _name: 'CommandStubThrows',
  run: () => Promise.reject(err),
});

describe('services', () => {
  describe('dispatchCommand', () => {
    it('should run any command passed to it', async () => {
      const expected = 'foo';
      const cmd = commandStub(expected);
      const spy = sinon.spy(cmd, 'run');

      const actual = await dispatchCommand(cmd);

      expect(spy.calledOnce).to.be.true;
      expect(actual).to.equal(expected);
    });

    it('should return an error string if the command throws', async () => {
      const expectedToInclude = 'internal code is broken';
      const cmd = commandStubThrows(new Error('oh no'));

      const actual = await dispatchCommand(cmd);

      expect(actual).to.include(expectedToInclude);
    })
  });
});
