# `Operator` startWithIfAsynchronous

## startWithIfAsynchronous\<I, O>(value: O): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I, I | O>

Like <code>startWith</code>, but only emits if the source doesn't make its first emission synchronously

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| value | Value to start with | <span>O</span> | No |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/startWith

**Example**:
```typescript
import {asyncScheduler, of, scheduled} from 'rxjs';
import {startWithIfAsynchronous} from '@aloreljs/rxutils/operators';

scheduled(of('b'), asyncScheduler)
  .pipe(startWithIfAsynchronous('a'))
  .subscribe(console.log); // "a", "b"

of('b')
  .pipe(startWithIfAsynchronous('a'))
  .subscribe(console.log); // "b"
```

*Defined in [operators/startWithIfAsynchronous.ts:22:39](https://github.com/Alorel/rxutils/blob/9057654/projects/rxutils/operators/startWithIfAsynchronous.ts#L22).*