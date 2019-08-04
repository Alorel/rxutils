# `Operator` countEmissions

## countEmissions(emitInitialZero?: boolean): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<any, number>

Counts how many times the source observable emits.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| emitInitialZero | If set to true, it will immediately emit 0 when subscribed to | boolean | No | false |

**Example**:
```typescript
import {of} from 'rxjs';
import {countEmissions} from '@aloreljs/rxutils/operators';

of('foo', 'bar', 'qux')
  .pipe(countEmissions())
  .subscribe() // emits 1, then 2, then 3 and completes
```

*Defined in [operators/countEmissions.ts:15:30](https://github.com/Alorel/rxutils/blob/490028b/src/operators/countEmissions.ts#L15).*