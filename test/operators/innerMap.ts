import {expect} from 'chai';
import {noop, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {innerMap} from '../../src/operators/innerMap';

describe('operators/innerMap', () => {
  it('basic usage', cb => {
    of([1, 2, 3])
      .pipe(
        innerMap<number, number>(i => i * 2),
        tap(ret => {
          expect(ret).to.deep.eq([2, 4, 6]);
          cb();
        })
      )
      .subscribe(noop, cb);
  });
});
