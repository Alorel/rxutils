import {SchedulerAction, SchedulerLike, Subscription, timer} from 'rxjs';
import {tap} from 'rxjs/operators';

/** @internal */
export class DummyScheduler implements SchedulerLike {
  public now(): number {
    return Date.now();
  }

  public schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription {
    return new DummySchedulerAction<T>(work).schedule(state, delay);
  }

}

/** @internal */
export class DummySchedulerAction<T> extends Subscription implements SchedulerAction<T> {

  public static delays: number[] = [];

  public static scheduleCount = 0;

  public constructor(private readonly work: (this: SchedulerAction<T>, state?: T) => void) {
    super();
  }

  public schedule(state?: T, delay?: number): Subscription {
    DummySchedulerAction.scheduleCount++;
    DummySchedulerAction.delays.push(delay === undefined ? 0 : delay);

    const sub = timer(delay || 0)
      .pipe(
        tap(() => {
          this.work.call(this, state);
        })
      )
      .subscribe();
    this.add(sub);

    return this;
  }
}
