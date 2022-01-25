import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {filterUntilPasses} from './filterUntilPasses';

describe('operators/filterUntilPasses', function () {
  it('Should filter until the predicate passes', async () => {
    const v$ = await lastValueFrom(
      of('a', 'b', 'c', 'a', 'b', 'c')
        .pipe(filterUntilPasses(v => v === 'c'), toArray())
    );
    expect(v$).to.deep.eq(['c', 'a', 'b', 'c']);
  });
});
