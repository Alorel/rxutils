import {expect} from 'chai';
import type {Observable} from 'rxjs';
import {lastValueFrom, of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {startWithFactory} from './startWithFactory';

describe('operators/startWithFactory', function () {
  it('Should evaluate lazily', async () => {
    let starter = 'a';
    const src$: Observable<Array<string | number>> = of(1)
      .pipe(startWithFactory(() => starter), toArray());

    expect(await lastValueFrom(src$)).to.deep.eq(['a', 1], 'first');
    starter = 'b';
    expect(await lastValueFrom(src$)).to.deep.eq(['b', 1], 'second');
  });
});
