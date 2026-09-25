import { inr, signedInr } from '../src/format';

test('formats Indian rupees', () => {
  expect(inr(18450000)).toBe('₹1,84,50,000');
  expect(signedInr(-115000)).toBe('−₹1,15,000');
  expect(signedInr(2240600)).toBe('+₹22,40,600');
});
