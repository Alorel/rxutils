import {expect} from 'chai';
import {of} from 'rxjs';
import * as operators from '../../src/operators';

describe('operators/innerReduce & innerReduceRight', () => {
  let src: number[];
  beforeEach(() => {
    src = [1, 2, 3, 4, 5];
  });

  const specs: ['innerReduce' | 'innerReduceRight', string, string][] = [
    ['innerReduce', '1|2,1|3,2|4,3|5,4', '|1,0|2,1|3,2|4,3|5,4'],
    ['innerReduceRight', '5|4,3|3,2|2,1|1,0', '|5,4|4,3|3,2|2,1|1,0']
  ];

  function reducer(acc: string, val: number, idx: number): string {
    return `${acc}|${val},${idx}`;
  }

  for (const [operatorName, expNoinit, expInit] of specs) {
    describe(operatorName, () => {
      const operator = operators[operatorName];

      it(`No initial value should reduce to ${expNoinit}`, () => {
        return of(src).pipe(operator(reducer)).toPromise()
          .then(v => {
            expect(v).to.eq(expNoinit);
          });
      });

      it(`Initial value '' should reduce to ${expInit}`, () => {
        return of(src).pipe(operator(reducer, () => '')).toPromise()
          .then(v => {
            expect(v).to.eq(expInit);
          });
      });
    });
  }
});
