# `Utility` observify

## observify\<T>(inp: [ObservifyInput](https://github.com/Alorel/rxutils/blob/0ae56ba/projects/rxutils/types/ObservifyInput.ts#L8)\<T>): [Observable](https://rxjs.dev/api/index/class/Observable)\<T>

Turns the input into an observable if it isn't one already

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| inp | The input | <span>[ObservifyInput](https://github.com/Alorel/rxutils/blob/0ae56ba/projects/rxutils/types/ObservifyInput.ts#L8)\<T></span> | No |  |

*Added in version 1.4*

**Example**:
```typescript
import {of} from 'rxjs';
import {observify} from '@aloreljs/rxutils';

observify(of(1)).subscribe(); // outputs 1
observify(Promise.resolve(2)).subscribe(); // outputs 2
observify(3).subscribe(); // outputs 3
```

*Defined in [util/observify.ts:21:25](https://github.com/Alorel/rxutils/blob/0ae56ba/projects/rxutils/util/observify.ts#L21).*