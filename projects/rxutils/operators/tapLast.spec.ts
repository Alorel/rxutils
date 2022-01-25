import {expect} from 'chai';
import {defaultIfEmpty, EMPTY, lastValueFrom, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {tapLast} from './tapLast';

describe('operators/tapLast', function () {
  let tapLasts: Array<string | undefined>;
  let tapAlls: string[];

  before(async () => {
    tapLasts = [];
    tapAlls = [];

    await lastValueFrom(
      of('foo', 'bar', 'qux').pipe(
        tapLast(v => {
          tapLasts.push(v);
        }),
        tap(v => {
          tapAlls.push(v);
        })
      )
    );
  });

  it('foo bar qux should all get emitted', () => {
    expect(tapAlls).to.deep.eq(['foo', 'bar', 'qux']);
  });

  it('foo bar qux should only tapLast "qux"', () => {
    expect(tapLasts).to.deep.eq(['qux']);
  });

  it('Should emit void if nothing gets emitted', async () => {
    const taps: any[] = [];
    await lastValueFrom(
      EMPTY
        .pipe(
          tapLast(v => {
            taps.push(v);
          }),
          defaultIfEmpty(null)
        )
    );
    expect(taps).to.deep.eq([undefined]);
  });
});
