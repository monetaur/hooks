import { act, renderHook } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

const TEST_KEY = 'test-key';
const INITIAL_VALUE = Date.now();

beforeEach(() => {
  localStorage.setItem(TEST_KEY, INITIAL_VALUE);
});

afterEach(() => {
  localStorage.removeItem(TEST_KEY);
});

test('should get initial value from local storage', () => {
  const { result } = renderHook(() => (
    useLocalStorage(TEST_KEY)
  ));

  expect(result.current[0]).toBe(INITIAL_VALUE.toString()); // All values in LS are strings
});

test('should parse value as JSON', () => {
  const { result } = renderHook(() => (
    useLocalStorage(TEST_KEY, { json: true })
  ));

  expect(result.current[0]).toBe(INITIAL_VALUE);
});

test('should update state', () => {
  const { result } = renderHook(() => (
    useLocalStorage(TEST_KEY)
  ));

  act(() => {
    result.current[1]('new_value');
  });

  expect(result.current[0]).toBe('new_value');
});

test('should update local storage', () => {
  const { result } = renderHook(() => (
    useLocalStorage(TEST_KEY)
  ));

  act(() => {
    result.current[1]('new_value');
  });

  expect(localStorage.getItem(TEST_KEY)).toBe('new_value');
});
