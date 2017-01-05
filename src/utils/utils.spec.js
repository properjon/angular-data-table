import { objectId } from './utils';

describe('utils', () => {
  it('should generate unique ID', () => {
    const id1 = objectId();
    const id2 = objectId();

    expect(id1).not.toBe(id2);
  });
});
