import { ObjectId } from './utils';

describe('utils', () => {
  it('should generate unique ID', () => {
    const id1 = ObjectId();
    const id2 = ObjectId();

    expect(id1).not.toBe(id2);
  });
});
