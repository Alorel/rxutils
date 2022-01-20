import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import {tap, toArray} from 'rxjs/operators';
import {takeTruthy} from './takeTruthy';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/takeTruthy', () => {
  it('Should emit ["foo", "bar"] when taking 5', async () => {
    await lastValueFrom(
      of<any>(false, 0, 'foo', null, 'bar', undefined)
        .pipe(
          takeTruthy<any>(5),
          toArray(),
          tap(out => {
            expect(out).to.deep.eq(['foo', 'bar']);
          })
        )
    );
  });

  it('Should emit ["foo"] when taking 1', async () => {
    await lastValueFrom(
      of<any>(false, 0, 'foo', null, 'bar', undefined)
        .pipe(
          takeTruthy<any>(1),
          toArray(),
          tap(out => {
            expect(out).to.deep.eq(['foo']);
          })
        )
    );
  });

  it('Should emit [] when taking 0', async () => {
    await lastValueFrom(
      of<any>(1, 2, 3, 4, 5, 6, 7, 8, 9)
        .pipe(
          takeTruthy<any>(0),
          toArray(),
          tap(out => {
            expect(out).to.deep.eq([]);
          })
        )
    );
  });
});
