import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import {tap, toArray} from 'rxjs/operators';
import {takeFalsy} from './takeFalsy';

describe('operators/takeFalsy', () => {
  it('Should emit [false, 0, null, undefined] when taking 5', async () => {
    await lastValueFrom(
      of<any>(false, 0, 'foo', null, 'bar', undefined)
        .pipe(
          takeFalsy<any>(5), // eslint-disable-line @typescript-eslint/no-magic-numbers
          toArray(),
          tap(out => {
            expect(out).to.deep.eq([false, 0, null, undefined]);
          })
        )
    );
  });

  it('Should emit [false] when taking 1', async () => {
    await lastValueFrom(
      of<any>(false, 0, 'foo', null, 'bar', undefined)
        .pipe(
          takeFalsy<any>(1),
          toArray(),
          tap(out => {
            expect(out).to.deep.eq([false]);
          })
        )
    );
  });

  it('Should emit [] when taking 0', async () => {
    await lastValueFrom(
      of<any>(false, 0, null, undefined)
        .pipe(
          takeFalsy<any>(0),
          toArray(),
          tap(out => {
            expect(out).to.deep.eq([]);
          })
        )
    );
  });
});
