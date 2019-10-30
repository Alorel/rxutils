import {expect} from 'chai';
import {AsyncSubject} from 'rxjs';
import {PartialObserver} from 'rxjs/src/internal/types';
import {nextComplete} from '../../src';

describe('util/nextComplete', function () {
  let NONE: any; //tslint:disable-line:variable-name
  let nextValue: any;
  let sbj: AsyncSubject<any>;

  beforeEach(() => {
    NONE = Symbol();
    nextValue = NONE;
    sbj = new AsyncSubject<any>();
  });

  afterEach(() => {
    sbj.complete();
  });

  function mkSubscriber(expected: any, cb: any): PartialObserver<any> {
    return {
      complete: () => {
        try {
          expect(nextValue).to.eq(expected);
          cb();
        } catch (e) {
          cb(e);
        }
      },
      error: cb,
      next(v) {
        nextValue = v;
      }
    };
  }

  it('Without next()', cb => {
    sbj.subscribe(mkSubscriber(undefined, cb));
    nextComplete(sbj);
  });

  it('With next()', cb => {
    const val = Math.random();
    sbj.subscribe(mkSubscriber(val, cb));
    nextComplete(sbj, val);
  });
});
