# `Operator` pickProps

## pickProps\<I, P>(props: P[]): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I, [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)\<I, P>>

Map to an object composed of the provided properties. Uses lodash's pick function and therefore accepts deep
property paths

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| props | Properties to pick | <span>P[]</span> | No |  |

**Returns**: An empty object if the source is not an object or the properties array is empty,
else an object composed of the provided properties, if they exist on the object.

*Added in version 1.0.0*

**Throws**: When the properties input is not an array

**See**: https://lodash.com/docs/#pick

**Example**:
```typescript
import {of} from 'rxjs';
import {pickProps} from '@aloreljs/rxutils/operators';

const obj = {
  foo: {
    bar: 1,
    qux: 2
  },
  baz: 3,
  bux: 4
};

of(obj)
  .pipe(pickProps(['foo.bar', 'baz']))
  .subscribe();
// outputs {foo: {bar: 1}, baz: 3}
```

*Defined in [operators/pickProps.ts:34:25](https://github.com/Alorel/rxutils/blob/3fadbc6/src/operators/pickProps.ts#L34).*
## pickProps\<I, O>(props: [PropertyKey](#)[]): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I, O>

Map to an object composed of the provided properties. Uses lodash's pick function and therefore accepts deep
property paths

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| props | Properties to pick | <span>[PropertyKey](#)[]</span> | No |  |

**Returns**: An empty object if the source is not an object or the properties array is empty,
else an object composed of the provided properties, if they exist on the object.

**Throws**: When the properties input is not an array

**See**: https://lodash.com/docs/#pick

**Example**:
```typescript
import {of} from 'rxjs';
import {pickProps} from '@aloreljs/rxutils/operators';

const obj = {
  foo: {
    bar: 1,
    qux: 2
  },
  baz: 3,
  bux: 4
};

of(obj)
  .pipe(pickProps(['foo.bar', 'baz']))
  .subscribe();
// outputs {foo: {bar: 1}, baz: 3}
```

*Defined in [operators/pickProps.ts:62:25](https://github.com/Alorel/rxutils/blob/3fadbc6/src/operators/pickProps.ts#L62).*