# `Operator` takeFalsy

## takeFalsy\<I, O>(numToTake: number): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I, O>

Shorthand for <code>source.pipe(filter(v => !v), take(num))</code>

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| numToTake | Number of emissions to take. Passed on to rxjs' take() operator | number | No |  |

*Added in version 1.0.0*

**Example**:
```typescript
import {of} from 'rxjs';
import {takeFalsy} from '@aloreljs/rxutils/operators';

of(false, true, 1, 0, 5, undefined, 'foo', null)
  .pipe(takeFalsy(3))
  .subscribe();
// outputs false, 0, undefined
```

*Defined in [operators/takeFalsy.ts:19:25](https://github.com/Alorel/rxutils/blob/8170cb0/src/operators/takeFalsy.ts#L19).*