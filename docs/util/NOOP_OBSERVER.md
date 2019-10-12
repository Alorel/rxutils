# `Utility` NOOP_OBSERVER

A no-op observer to be passed to .subscribe() calls when you do your logic and/or error handling inside the
observable pipeline.



**Example**:
```typescript
import {of} from 'rxjs';
import {NOOP_OBSERVER} from '@aloreljs/rxutils';

of(1).subscribe(NOOP_OBSERVER);
```

*Defined in [util/NOOP_OBSERVER.ts:14:26](https://github.com/Alorel/rxutils/blob/14b60f9/src/util/NOOP_OBSERVER.ts#L14).*