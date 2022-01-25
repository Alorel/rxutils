import {expect} from 'chai';
import {asyncScheduler, lastValueFrom, of, scheduled} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {startWithIfAsynchronous} from './startWithIfAsynchronous';

describe('operators/startWithIfAsynchronous', function () {
  it('Should emit value if async', async () => {
    const src$ = scheduled(of('a'), asyncScheduler)
      .pipe(startWithIfAsynchronous('b'), toArray());

    expect(await lastValueFrom(src$)).to.deep.eq(['b', 'a']);
  });

  it('Should not emit value if sync', async () => {
    const src$ = of('a').pipe(startWithIfAsynchronous('b'), toArray());
    expect(await lastValueFrom(src$)).to.deep.eq(['a']);
  });
});
