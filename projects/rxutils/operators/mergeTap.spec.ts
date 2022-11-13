import {expect} from 'chai';
import {switchMergeTapTestCommon} from '../internal/switchMergeTap.spec';
import {mergeTap} from './mergeTap';

describe('operators/mergeTap', function () {
  let asyncTapped: string[];
  let all: string[];

  before(async () => {
    const init = await switchMergeTapTestCommon(mergeTap);
    asyncTapped = init.asyncTapped;
    all = init.all;
  });

  it('Should leave inputs unchanged, not halt timed out inputs', () => {
    expect(all).to.deep.eq(['a', 'b', 'c']);
  });

  it('Should manage to tap 3 items', () => {
    expect(asyncTapped).to.deep.eq(['a', 'b', 'c']);
  });
});
