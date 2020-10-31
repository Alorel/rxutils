# `Function` wasLogged

## wasLogged(v: any): boolean

Check if the given error was logged by the {@link logError} operator

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| v | Error to check | <span>any</span> | No |  |

**Returns**: True if the input is truthy and has been logged, false otherwise

*Added in version 1.0.0*

**Example**:
```typescript
import {throwError, noop} from 'rxjs';
import {wasLogged} from '@aloreljs/rxutils';
import {logError, tapError} from '@aloreljs/rxutils/operators';

throwError(new Error())
  .pipe(
    logError(),
    tapError(e => {
      console.log(wasLogged(e)); // true
    })
  )
  .subscribe(noop, noop);

throwError(new Error())
  .pipe(
    tapError(e => {
      console.log(wasLogged(e)); // false
    })
  )
  .subscribe(noop, noop);

throwError('foo')
  .pipe(
    logError(),
    tapError(e => {
      console.log(wasLogged(e)); // false
    })
  )
  .subscribe(noop, noop);
```

*Defined in [operators/logError.ts:44:25](https://github.com/Alorel/rxutils/blob/b6df7ef/src/operators/logError.ts#L44).*