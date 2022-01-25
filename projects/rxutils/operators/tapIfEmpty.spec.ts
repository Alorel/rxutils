import {expect} from 'chai';
import {defaultIfEmpty, EMPTY, lastValueFrom, of} from 'rxjs';
import {tapIfEmpty} from './tapIfEmpty';

describe('operators/tapIfEmpty', function () {
  it('Should tap if source is empty', async () => {
    let tapped = false;
    await lastValueFrom(
      EMPTY.pipe(
        tapIfEmpty(() => {
          tapped = true;
        }),
        defaultIfEmpty(0)
      )
    );

    expect(tapped).to.eq(true);
  });

  it('Should not tap if source isn\'t empty', async () => {
    let tapped = false;
    await lastValueFrom(
      of(0).pipe(tapIfEmpty(() => {
        tapped = true;
      }))
    );

    expect(tapped).to.eq(false);
  });
});
