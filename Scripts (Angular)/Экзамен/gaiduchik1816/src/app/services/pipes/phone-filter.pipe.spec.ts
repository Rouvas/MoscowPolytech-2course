import { PhoneFilterPipe } from './phone-filter.pipe';

describe('PersonFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
