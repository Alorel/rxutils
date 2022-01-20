import type {SchedulerAction, SchedulerLike, Subscription} from 'rxjs';
import {interval, Observable, scheduled, throwError} from 'rxjs';
import {DEFAULT_SCHEDULER} from '../internal/DEFAULT_SCHEDULER';
import {rng, validateRng} from '../internal/rng';

/**
 * An interval that emits with random delays
 * @kind Creator
 * @since 1.0.0
 * @param lower Minimum delay
 * @param upper Maximum delay
 * @param scheduler Scheduler to use
 * @return An observable that emits the iteration index, starting at 0
 * @example
 * import {intervalRandom} from '@aloreljs/rxutils';
 * import {asapScheduler} from 'rxjs';
 *
 * intervalRandom(1000, 2000).subscribe(); // emit every 1-2 seconds on the default scheduler
 * intervalRandom(1000, 2000, asapScheduler).subscribe(); // emit every 1-2 seconds on the ASAP scheduler
 */
export function intervalRandom(
  lower: number,
  upper: number,
  scheduler: SchedulerLike = DEFAULT_SCHEDULER
): Observable<number> {
  try {
    validateRng(lower, upper);
  } catch (e) {
    return scheduled(throwError(() => e), scheduler);
  }

  if (lower === upper) {
    return interval(lower, scheduler);
  }

  return new Observable<number>(subscriber => {
    let sub: Subscription;
    function dispatcher(this: SchedulerAction<number>, count?: number): void {
      subscriber.next(count!);
      sub = this.schedule(count! + 1, rng(lower, upper));
    }
    sub = scheduler.schedule(dispatcher, rng(lower, upper), 0);

    return () => {
      sub.unsubscribe();
    };
  });
}
