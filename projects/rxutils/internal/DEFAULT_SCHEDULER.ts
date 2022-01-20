import type {SchedulerLike} from 'rxjs';
import {asyncScheduler} from 'rxjs';

/** @internal */
export const DEFAULT_SCHEDULER: SchedulerLike = asyncScheduler;
