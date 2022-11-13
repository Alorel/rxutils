# `Operator` collectForTime

## collectForTime\<T>(time: number): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<T, T[]>

Collect values until none have been emitted for the given duration then emit them as an array.
This differs from bufferTime operator as bufferTime will continue emitting even if the source hasn't emitted
during that time period.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| time | The duration | <span>number</span> | No |  |

**See**: https://rxjs.dev/api/operators/bufferTime

*Added in version 2.1.0*

**Example**:
```typescript
import {of} from 'rxjs';
import {delay, startWith, toArray} from 'rxjs/operators';
import {collectForTime} from '@aloreljs/rxutils/operators';

// Read the observable pipeline from the bottom
const source$ = of(6) // then emit 6
   .pipe(
     delay(5), /// Then wait for 5 ms
     startWith(5), // Then emit 5
     delay(5), // Then wait for 5 ms
     startWith(4), // Then emit 4
     delay(25), // Then wait for 25 ms
     startWith(3), // Then emit 3
     delay(5), // Then wait for 5 ms
     startWith(2), // Then emit 2
     delay(5), // Then wait 5 ms
     startWith(1) // Emit 1
   );

 source$
   .pipe(collectForTime(20), toArray())
   .subscribe(v => {
     console.log(v); // outputs [1, 2, 3] after around 30ms, then [4, 5, 6] after another 30 ish.
   });
```

*Defined in [operators/collectForTime.ts:39:30](https://github.com/Alorel/rxutils/blob/e14ca99/projects/rxutils/operators/collectForTime.ts#L39).*