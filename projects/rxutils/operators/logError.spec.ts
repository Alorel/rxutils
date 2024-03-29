import {expect} from 'chai';
import {noop, random} from 'lodash';
import {throwError} from 'rxjs';
import * as sinon from 'sinon';
import {v4 as uuid} from 'uuid';
import {finaliseObserver} from '../util/finaliseObserver';
import {NOOP_OBSERVER} from '../util/NOOP_OBSERVER';
import {logError, setDefaultLogger, wasLogged} from './logError';
import {tapError} from './tapError';

describe('operators/logError', () => {
  describe('No args', () => {
    let spy: sinon.SinonSpy;
    let oldConsoleError: any;

    before('Spy', () => {
      oldConsoleError = console.error;
      console.error = noop;
      spy = sinon.spy<any, any>(console, 'error');
    });

    after('Unspy', () => {
      spy.restore();
      console.error = oldConsoleError;
    });

    before('Run', cb => {
      throwError(() => new Error('test-error'))
        .pipe(logError(), logError())
        .subscribe(finaliseObserver(cb));
    });

    it('Should have been called once', () => {
      expect(spy.callCount).to.equal(1);
    });

    it('Should have been called with one arg', () => {
      expect(spy.firstCall.args).to.have.lengthOf(1);
    });

    it('Should have been called with test-error', () => {
      expect(spy.firstCall.args[0].message).to.equal('test-error');
    });
  });

  describe('Custom logger', () => {
    let logger: {readonly prefix: string; log(...args: any[]): void};
    let callArgs: any[];

    before('Init custom logger', () => {
      class Logger {
        public readonly prefix = 'foo';

        public log(...args: any[]): void {
          callArgs = this && this.prefix
            ? args.map(arg => ({arg, prefix: this.prefix}))
            : args;
        }
      }

      logger = new Logger();
    });

    describe('No thisArg', () => {
      before('Run', cb => {
        throwError(() => new Error('foo-error'))
          .pipe(logError(undefined, logger.log))
          .subscribe(finaliseObserver(cb));
      });

      it('Should have one call arg', () => {
        expect(callArgs.length).to.equal(1);
      });

      it('Arg should be foo error', () => {
        expect(callArgs[0].message).to.equal('foo-error');
      });
    });

    describe('With thisArg', () => {
      before('Run', cb => {
        throwError(() => new Error('foo-error'))
          .pipe(logError(undefined, logger.log, logger))
          .subscribe(finaliseObserver(cb));
      });

      it('Should have one call arg', () => {
        expect(callArgs.length).to.equal(1);
      });

      it('1st arg should have property prefix', () => {
        expect(callArgs[0].prefix).to.equal('foo');
      });

      it('1st arg should have error', () => {
        expect(callArgs[0].arg.message).to.equal('foo-error');
      });
    });
  });

  describe('With identifier', () => {
    let spy: sinon.SinonSpy;
    let oldConsoleError: any;
    const id = uuid();

    before('Spy', () => {
      oldConsoleError = console.error;
      console.error = noop;
      spy = sinon.spy<any, any>(console, 'error');
    });

    after('Unspy', () => {
      spy.restore();
      console.error = oldConsoleError;
    });

    before('Run', cb => {
      throwError(() => new Error('test-error'))
        .pipe(logError(id), logError())
        .subscribe(finaliseObserver(cb));
    });

    it('Should have been called once', () => {
      expect(spy.callCount).to.equal(1);
    });

    it('Should have been called with two args', () => {
      expect(spy.firstCall.args).to.have.lengthOf(2); // eslint-disable-line @typescript-eslint/no-magic-numbers
    });

    it(`1st arg should be ${id}`, () => {
      expect(spy.firstCall.args[0]).to.equal(id);
    });

    it('2nd arg should be test-error', () => {
      expect(spy.firstCall.args[1].message).to.equal('test-error');
    });
  });
});

describe('setDefaultLogger', () => {
  let oldLogger: any;
  let logSpy: sinon.SinonSpy;

  before('Set', () => {
    oldLogger = setDefaultLogger(logSpy = sinon.spy<any>(function () {
      // noop
    }));
  });

  after('Restore logger', () => {
    setDefaultLogger(oldLogger);
  });

  before('Run', cb => {
    throwError(() => new Error('test-err'))
      .pipe(logError())
      .subscribe(finaliseObserver(cb));
  });

  it('Should have been called once', () => {
    expect(logSpy.callCount).to.equal(1);
  });

  it('Old method should === console.error', () => {
    expect(oldLogger).to.equal(console.error);
  });
});

describe('wasLogged', () => {
  let err1: Error, err2: Error;

  before('Run unlogged', cb => {
    throwError(() => new Error())
      .pipe(
        tapError(e => {
          err1 = e;
        })
      )
      .subscribe(finaliseObserver(cb));
  });

  before('Run logged', cb => {
    throwError(() => new Error())
      .pipe(
        tapError(e => {
          err2 = e;
        }),
        logError(undefined, noop)
      )
      .subscribe(finaliseObserver(cb));
  });

  it('err1 should be unlogged', () => {
    expect(wasLogged(err1)).to.eq(false);
  });

  it('err1 should be logged', () => {
    expect(wasLogged(err2)).to.eq(true);
  });

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  for (const t of [null, undefined, random(1, 10), 0]) {
    it(`${String(t)} should always return false`, cb => {
      throwError(() => t)
        .pipe(
          logError(undefined, noop),
          tapError(err => {
            try {
              expect(wasLogged(err)).to.eq(false);
              cb();
            } catch (e) {
              cb(e);
            }
          })
        )
        .subscribe(NOOP_OBSERVER);
    });
  }
});
