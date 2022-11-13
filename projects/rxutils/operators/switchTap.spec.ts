import {expect} from 'chai';
import {switchMergeTapTestCommon} from '../internal/switchMergeTap.spec';
import {switchTap} from './switchTap';

describe('operators/switchTap', function () {
  let asyncTapped: string[];
  let all: string[];

  before(async () => {
    const init = await switchMergeTapTestCommon(switchTap);
    asyncTapped = init.asyncTapped;
    all = init.all;
  });

  it('Should leave inputs unchanged, halt timed out inputs', () => {
    expect(all).to.deep.eq(['b', 'c']);
  });

  it('Should manage to tap 2 items', () => {
    expect(asyncTapped).to.deep.eq(['b', 'c']);
  });
});
