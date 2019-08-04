import {expect} from 'chai';
import {of} from 'rxjs';
import {tap, toArray} from 'rxjs/operators';
import {takeFalsy} from '../../src/operators';

describe('operators/takeFalsy', () => {
  it('Should emit [false, 0, null, undefined] when taking 5', async () => {
    await of<any>(false, 0, 'foo', null, 'bar', undefined)
      .pipe(
        takeFalsy<any>(5),
        toArray(),
        tap(out => {
          expect(out).to.deep.eq([false, 0, null, undefined]);
        })
      )
      .toPromise();
  });

  it('Should emit [false] when taking 1', async () => {
    await of<any>(false, 0, 'foo', null, 'bar', undefined)
      .pipe(
        takeFalsy<any>(1),
        toArray(),
        tap(out => {
          expect(out).to.deep.eq([false]);
        })
      )
      .toPromise();
  });

  it('Should emit [] when taking 0', async () => {
    await of<any>(false, 0, null, undefined)
      .pipe(
        takeFalsy<any>(0),
        toArray(),
        tap(out => {
          expect(out).to.deep.eq([]);
        })
      )
      .toPromise();
  });
});
