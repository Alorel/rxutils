import type {Subject} from 'rxjs';

/**
 * Shorthand for subject.next(value); subject.complete()
 * @since 1.5.0
 * @kind Utility
 * @param subj The subject to work with
 * @param nextValue An optional value to next() before completing the subject
 * @example
 * import {nextComplete} from '@aloreljs/rxutils';
 * import {Subject} from 'rxjs';
 *
 * const subject1 = new Subject();
 * const subject2 = new Subject();
 *
 * subject1.subscribe(
 *   v => console.log(`Next (1): ${v}`),
 *   console.error,
 *   () => console.log('Completed (1)')
 * );
 * subject2.subscribe(
 *   v => console.log(`Next (2): ${v}`),
 *   console.error,
 *   () => console.log('Completed (2)')
 * );
 * nextComplete(subject1);
 * nextComplete(subject2, 'foo');
 * // Output:
 * Next (1): undefined
 * Completed (1)
 * Next (2): foo
 * Completed (2)
 */
export function nextComplete<T>(subj: Pick<Subject<T>, 'next' | 'complete'>, nextValue?: T): void {
  subj.next(nextValue!);
  subj.complete();
}
