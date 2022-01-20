import {expect} from 'chai';
import {of} from 'rxjs';
import {tap, toArray} from 'rxjs/operators';
import {countEmissions} from './countEmissions';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/countEmissions', () => {
  const baseTestCases: Array<[[boolean?], number[]]> = [
    [[false], [1, 2, 3]],
    [[], [1, 2, 3]],
    [[true], [0, 1, 2, 3]]
  ];

  for (const [args, output] of baseTestCases) {
    const outputStr = args[0] === undefined ? 'undefined' : args[0].toString();

    it(`Should emit ${output.join(', ')} when input is ${outputStr}`, async () => {
      await of('foo', 'bar', 'qux')
        .pipe(
          countEmissions(...args),
          toArray(),
          tap((emissions: number[]) => {
            expect(emissions).to.deep.eq(output);
          })
        )
        .toPromise();
    });
  }
});
