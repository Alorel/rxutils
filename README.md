<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Rx Utils](#rx-utils)
- [Installation](#installation)
- [Polyfills](#polyfills)
- [Lodash](#lodash)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Rx Utils

Utility functions for rxjs

![Core](https://github.com/Alorel/rxutils/workflows/Core/badge.svg)

-----

A collection of utility functions for rxjs:

```typescript
import {of} from 'rxjs';
import {innerMap, logError, distinctUntilDeepChanged} from '@aloreljs/rxutils/operators';

of([1, 2, 3])
  .pipe(
    innerMap(n => n * 2),
    logError('[Inner map error]'),
    distinctUntilDeepChanged()
  )
  .subscribe();
```

Full API docs and examples for version 2.0.0 are available [here](https://github.com/Alorel/rxutils/tree/2.0.0/docs).
Docs and examples for the latest version are available [here](http://bit.ly/rxutils-master-docs).

# Installation
```
npm install rxjs@^6.0.0 @aloreljs/rxutils;
```

# Polyfills

Apart from your standard ES6 polyfills, you must ensure `Symbol`s are polyfilled.

# Lodash

This library depends on both `lodash` and `lodash-es`. Lodash is used in the package's
commonjs & UMD builds while lodash-es is used for ESM builds. The package's main fields
should use the correct build automatically.

