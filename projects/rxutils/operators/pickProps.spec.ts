import {expect} from 'chai';
import {noop} from 'lodash';
import type {Observable} from 'rxjs';
import {lastValueFrom, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {pickProps} from './pickProps';

interface Foo {
  bar: number;

  baz: number;

  foo: number;

  qux: number;
}

type FooObj = Foo & { deep: Foo };

describe('operators/pickProps', () => {
  let obj: FooObj;
  let source$: Observable<FooObj>;

  beforeEach('Reset object and source', () => {
    obj = {
      bar: 2,
      baz: 4,
      deep: {
        bar: 2,
        baz: 4,
        foo: 1,
        qux: 3
      },
      foo: 1,
      qux: 3
    };
    source$ = of(obj);
  });

  it('Should throw if props is not an array', () => {
    expect(() => pickProps(<any>1)).to.throw(TypeError, 'Picked properties must be an array');
  });

  it('Should map to {} if an empty property array is given', async () => {
    const out$ = lastValueFrom(await source$.pipe(pickProps([])));
    expect(await out$).to.deep.eq({});
  });

  it('Should map to {} when the source is a non-object', async () => {
    const out = await lastValueFrom(of<any>(1).pipe(pickProps(['foo'])));
    expect(out).to.deep.eq({});
  });

  it('Should have implicit typings', async () => {
    await lastValueFrom(
      source$
        .pipe(
          pickProps(['foo', 'bar']),
          tap(out => {
            noop(out.foo);
            noop(out.bar);
          })
        )
    );
  });

  it('Should work with shallow props', async () => {
    await lastValueFrom(
      source$
        .pipe(
          pickProps(['deep', 'qux', 'notAProp']),
          tap(out => {
            expect(out).to.deep.eq({
              deep: {
                bar: 2,
                baz: 4,
                foo: 1,
                qux: 3
              },
              qux: 3
            });
          })
        )
    );
  });

  it('Should work with deep props', async () => {
    await lastValueFrom(
      source$
        .pipe(
          pickProps(['foo', 'deep.bar', 'deep.qux', 'notAProp']),
          tap(out => {
            expect(out).to.deep.eq({
              deep: {
                bar: 2,
                qux: 3
              },
              foo: 1
            });
          })
        )
    );
  });
});
