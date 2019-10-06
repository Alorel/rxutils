# Rx Utils

Utility functions for rxjs

[![Greenkeeper badge](https://badges.greenkeeper.io/Alorel/rxutils.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.com/Alorel/rxutils.svg?branch=1.2.0)](https://travis-ci.com/Alorel/rxutils)
[![Coverage Status](https://coveralls.io/repos/github/Alorel/rxutils/badge.svg?branch=1.2.0)](https://coveralls.io/github/Alorel/rxutils?branch=1.2.0)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Alorel/rxutils.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Alorel/rxutils/context:javascript)

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

Full API docs and examples for version 1.2.0 are available [here](https://github.com/Alorel/rxutils/tree/1.2.0/docs).
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

