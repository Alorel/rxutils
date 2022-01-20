import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import * as operators from '../../rxutils/operators';

describe('operators/innerReduce & innerReduceRight', () => {
  let src: number[];
  beforeEach(() => {
    src = [1, 2, 3, 4, 5]; // eslint-disable-line @typescript-eslint/no-magic-numbers
  });

  const specs: Array<['innerReduce' | 'innerReduceRight', string, string]> = [
    ['innerReduce', '1|2,1|3,2|4,3|5,4', '|1,0|2,1|3,2|4,3|5,4'],
    ['innerReduceRight', '5|4,3|3,2|2,1|1,0', '|5,4|4,3|3,2|2,1|1,0']
  ];

  function reducer(acc: string, val: number, idx: number): string {
    return `${acc}|${val},${idx}`;
  }

  for (const [operatorName, expNoinit, expInit] of specs) {
    describe(operatorName, () => {
      const operator = operators[operatorName];

      it(`No initial value should reduce to ${expNoinit}`, async () => {
        const v = await lastValueFrom(of(src).pipe(operator(reducer)));
        expect(v).to.eq(expNoinit);
      });

      it(`Initial value '' should reduce to ${expInit}`, async () => {
        const v = await lastValueFrom(of(src).pipe(operator(reducer, () => '')));
        expect(v).to.eq(expInit);
      });
    });
  }
});
