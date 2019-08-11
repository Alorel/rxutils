# `Operator` takeTruthy

## takeTruthy\<I, O>(numToTake: number): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I, O>

Shorthand for <code>source.pipe(filter(v => !!v), take(num))</code>

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| numToTake | Number of emissions to take. Passed on to rxjs' take() operator | number | No |  |

**Example**:
```typescript
import {of} from 'rxjs';
import {takeTruthy} from '@aloreljs/rxutils/operators';

of(false, true, 1, 0, 5, undefined, 'foo', null)
  .pipe(takeTruthy(3))
  .subscribe();
// outputs true, 1, 5
```

*Defined in [operators/takeTruthy.ts:18:26](https://github.com/Alorel/rxutils/blob/ca6c4c0/src/operators/takeTruthy.ts#L18).*