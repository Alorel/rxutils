# `Operator` tapError

## tapError\<IO, E>(tapFn: (e?: E) => void): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<IO>

Shorthand for <code>tap(noop, tapFunction)</code>

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| tapFn | The tap function accepting an error argument | (e?: E) => void | No |  |

**See**: https://rxjs.dev/api/operators/tap

**Example**:
```typescript
import {throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {tapError} from '@aloreljs/rxutils/operators';

throwError(new Error('foo'))
  .pipe(
    tap(() => console.log('next'), () => console.log('error'), () => console.log('complete')),
    tapError(e => console.error(e)
  )
  .subscribe();
// Logs 'error', then the error object
```

*Defined in [operators/tapError.ts:22:24](https://github.com/Alorel/rxutils/blob/490028b/src/operators/tapError.ts#L22).*