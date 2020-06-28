import {capitalize, labelFromKey} from './utilityFunctions';

test('capitalize should capitalize the first character in a string', () => {
  expect(capitalize('test')).toEqual('Test');
  expect(capitalize('tEST')).toEqual('TEST');
  expect(capitalize('')).toEqual('');
});

test('label from key should remove underscores', () => {
  expect(labelFromKey('test_1')).toEqual('Test 1');
  expect(labelFromKey('test_1_2')).toEqual('Test 1 2');
  expect(labelFromKey('')).toEqual('');
});
