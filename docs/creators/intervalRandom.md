# `Creator` intervalRandom

## intervalRandom(lower: number, upper: number, scheduler?: [SchedulerLike](https://rxjs.dev/api/index/interface/SchedulerLike)): [Observable](https://rxjs.dev/api/index/class/Observable)\<number>

An interval that emits with random delays

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| lower | Minimum delay | number | No |  |
| upper | Maximum delay | number | No |  |
| scheduler | Scheduler to use | [SchedulerLike](https://rxjs.dev/api/index/interface/SchedulerLike) | No | DEFAULT_SCHEDULER |

**Returns**: An observable that emits the iteration index, starting at 0

**Example**:
```typescript
import {intervalRandom} from '@aloreljs/rxutils';
import {asapScheduler} from 'rxjs';

intervalRandom(1000, 2000).subscribe(); // emit every 1-2 seconds on the default scheduler
intervalRandom(1000, 2000, asapScheduler).subscribe(); // emit every 1-2 seconds on the ASAP scheduler
```

*Defined in [creators/intervalRandom.ts:29:30](https://github.com/Alorel/rxutils/blob/7128971/src/creators/intervalRandom.ts#L29).*