import {expect} from 'chai';
import {delay, lastValueFrom, of, timer} from 'rxjs';
import {map, startWith, toArray} from 'rxjs/operators';
import {switchTap} from './switchTap';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/switchTap', function () {
  let asyncTapped: string[];
  let all: string[];

  before(async () => {
    asyncTapped = [];

    const src$ = of('c').pipe(
      delay(15),
      startWith('b'),
      delay(5),
      startWith('a'),
      switchTap(v => timer(10).pipe(
        map(() => {
          asyncTapped.push(v);

          return v.toUpperCase();
        })
      )),
      toArray()
    );
    all = await lastValueFrom(src$);
  });

  it('Should leave inputs unchanged, halt timed out inputs', () => {
    expect(all).to.deep.eq(['b', 'c']);
  });

  it('Should manage to tap 2 items', () => {
    expect(asyncTapped).to.deep.eq(['b', 'c']);
  });
});
