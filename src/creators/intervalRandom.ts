import {interval, Observable, SchedulerAction, SchedulerLike, Subscriber, throwError} from 'rxjs';
import {DEFAULT_SCHEDULER} from '../internal/DEFAULT_SCHEDULER';
import {rng, validateRng} from '../internal/rng';

interface State {
  count: number;

  lower: number;

  subscriber: Subscriber<number>;

  upper: number;
}

/**
 * An interval that emits with random delays
 * @param lower Minimum delay
 * @param upper Maximum delay
 * @param scheduler Scheduler to use
 * @return An observable that emits the iteration index, starting at 0
 */
export function intervalRandom(
  lower: number,
  upper: number,
  scheduler: SchedulerLike = DEFAULT_SCHEDULER
): Observable<number> {
  try {
    validateRng(lower, upper);
  } catch (e) {
    return throwError(e, scheduler);
  }

  if (lower === upper) {
    return interval(lower, scheduler);
  }

  return new Observable<number>(subscriber => {
    subscriber.add(
      scheduler.schedule<State>(<any>dispatcher, rng(lower, upper), {
        count: 0,
        lower,
        subscriber,
        upper
      })
    );
  });
}

function dispatcher(this: SchedulerAction<State>, {subscriber, count, lower, upper}: State): void {
  subscriber.next(count);
  this.schedule({subscriber, count: count + 1, lower, upper}, rng(lower, upper));
}
