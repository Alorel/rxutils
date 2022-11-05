# `Operator` switchTap

## switchTap\<T>(tapper: (v: T) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<any>, thisArg?: any): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<T>

Like <code>tap</code>, but asynchronous and uses <code>switchMap</code> internally.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| tapper | The tap function | <span>(v: T) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<any></span> | No |  |
| thisArg | An optional thisArg | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/tap

**See**: https://rxjs.dev/api/operators/switchMap

**Example**:
```typescript
import {switchTap} from '@aloreljs/rxutils/operators';
import {take} from 'rxjs/operators';

userLoggingIn$
  .pipe(
    // Only allow one user to be logging in at a time
    switchTap(userId => processAsynchronously(userId)),
    take(1)
  )
  .subscribe(userId => {
    console.log(userId, 'logged in');
  });
```

*Defined in [operators/switchTap.ts:27:25](https://github.com/Alorel/rxutils/blob/9057654/projects/rxutils/operators/switchTap.ts#L27).*