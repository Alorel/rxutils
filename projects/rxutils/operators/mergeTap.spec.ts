import {expect} from 'chai';
import {delay, lastValueFrom, of, timer} from 'rxjs';
import {map, startWith, toArray} from 'rxjs/operators';
import {mergeTap} from './mergeTap';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/mergeTap', function () {
  let asyncTapped: string[];
  let all: string[];

  before(async () => {
    asyncTapped = [];

    const src$ = of('c').pipe(
      delay(15),
      startWith('b'),
      delay(5),
      startWith('a'),
      mergeTap(v => timer(10).pipe(
        map(() => {
          asyncTapped.push(v);

          return v.toUpperCase();
        })
      )),
      toArray()
    );
    all = await lastValueFrom(src$);
  });

  it('Should leave inputs unchanged, not halt timed out inputs', () => {
    expect(all).to.deep.eq(['a', 'b', 'c']);
  });

  it('Should manage to tap 3 items', () => {
    expect(asyncTapped).to.deep.eq(['a', 'b', 'c']);
  });
});
