# `Operator` distinctWithInitial

## distinctWithInitial\<T>(initial: T, comparator?: (previous: T, current: T) => boolean): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<T>

Shortcut alias for `pipe(startWith(initial), distinctUntilChanged())`

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| initial | The initial value | <span>T</span> | No |  |
| comparator | `distinctUntilChanged` comparator | <span>(previous: T, current: T) => boolean</span> | :heavy_check_mark: Yes |  |

*Added in version 2.3.0*

**See**: https://rxjs.dev/api/operators/startWith

**See**: https://rxjs.dev/api/operators/distinctUntilChanged

*Defined in [operators/distinctWithInitial.ts:14:35](https://github.com/Alorel/rxutils/blob/e14ca99/projects/rxutils/operators/distinctWithInitial.ts#L14).*
## distinctWithInitial\<T, K>(initial: T, comparator: (previous: K, current: K) => boolean, keySelector: (value: T) => K): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<T>

Shortcut alias for `pipe(startWith(initial), distinctUntilChanged())`

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| initial | The initial value | <span>T</span> | No |  |
| comparator | `distinctUntilChanged` comparator | <span>(previous: K, current: K) => boolean</span> | No |  |
| keySelector | `distinctUntilChanged` key selector | <span>(value: T) => K</span> | No |  |

*Added in version 2.3.0*

**See**: https://rxjs.dev/api/operators/startWith

**See**: https://rxjs.dev/api/operators/distinctUntilChanged

*Defined in [operators/distinctWithInitial.ts:29:35](https://github.com/Alorel/rxutils/blob/e14ca99/projects/rxutils/operators/distinctWithInitial.ts#L29).*