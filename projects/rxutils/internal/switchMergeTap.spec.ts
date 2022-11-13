import {delay, lastValueFrom, of, timer} from 'rxjs';
import {map, startWith, toArray} from 'rxjs/operators';
import type {mergeTap, switchTap} from '../operators';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/** @internal */
export async function switchMergeTapTestCommon(
  op: typeof switchTap | typeof mergeTap
): Promise<Record<'all' | 'asyncTapped', string[]>> {
  const asyncTapped: string[] = [];

  const src$ = of('c').pipe(
    delay(50),
    startWith('b'),
    delay(5),
    startWith('a'),
    op(v => timer(25).pipe(
      map(() => {
        asyncTapped.push(v);

        return v.toUpperCase();
      })
    )),
    toArray()
  );

  const all = await lastValueFrom(src$);

  return {all, asyncTapped};
}
