# `Operator` tapLast

## tapLast\<T>(tapFn: (value?: T) => void, thisArg?: any): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<T>

Similar to <code>tap({complete: ...})</code>, but passes on the last emitted value to the callback

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| tapFn | The callback function | <span>(value?: T) => void</span> | No |  |
| thisArg | An optional thisArg | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/tap

**Example**:
```typescript
import {of} from 'rxjs';
import {tapLast} from '@aloreljs/rxutils/operators';

of('foo', 'bar', 'qux')
  .pipe(
    tapLast(v => console.debug('tap', v))
  )
  .subscribe(v => {
    console.debug('subscribe', v);
  });
// Logs "subscribe foo", "subscribe bar", "subscribe qux", "tap qux"
```

*Defined in [operators/tapLast.ts:24:23](https://github.com/Alorel/rxutils/blob/e14ca99/projects/rxutils/operators/tapLast.ts#L24).*