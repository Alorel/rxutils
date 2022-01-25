import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import {innerFind} from './innerFind';

describe('operators/innerFind', function () {
  it('Should find item when it exists', async () => {
    const src$ = of(['a', 'b', 'c'])
      .pipe(innerFind(v => v === 'b'));

    expect(await lastValueFrom(src$)).to.eq('b');
  });

  it('Should return undefined when it doesn\'t exist', async () => {
    const src$ = of(['a', 'b', 'c'])
      .pipe(innerFind(v => v === 'd'));

    expect(await lastValueFrom(src$)).to.eq(undefined);
  });
});
