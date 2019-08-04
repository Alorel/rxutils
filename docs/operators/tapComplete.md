# `Operator` tapComplete

## tapComplete\<IO>(tapFn: () => void): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<IO>

Shorthand for <code>tap(noop, noop, tapFunction)</code>

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| tapFn | Tap function to execute when the source completes | () => void | N |  |

**See**: https://rxjs.dev/api/operators/tap

**Example**:
```typescript
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {tapComplete} from '@aloreljs/rxutils/operators';

of('foo')
  .pipe(
    tap(() => console.log('next'), () => console.log('error'), () => console.log('complete')),
    tapComplete(() => console.log('definitely complete'))
  )
  .subscribe();
// Logs "complete" then "definitely complete"
```

*Defined in [operators/tapComplete.ts:22:27](https://github.com/Alorel/rxutils/blob/5827c52/src/operators/tapComplete.ts#L22).*