import {asyncScheduler, SchedulerLike} from 'rxjs';

/** @internal */
export const DEFAULT_SCHEDULER: SchedulerLike = asyncScheduler;
