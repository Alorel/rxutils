import {Subject} from 'rxjs';

/**
 * Shorthand for subject.next(value); subject.complete()
 * @since 1.5.0
 * @kind Utility
 * @param subj The subject to work with
 * @param nextValue An optional value to next() before completing the subject
 */
export function nextComplete<T>(subj: Pick<Subject<T>, 'next' | 'complete'>, nextValue?: T): void {
  subj.next(nextValue);
  subj.complete();
}
