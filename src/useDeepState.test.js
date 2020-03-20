import { act, renderHook } from '@testing-library/react-hooks';
import useDeepState from './useDeepState';

test('should set an initial value', () => {
  const { result } = renderHook(() => (
    useDeepState({
      isLoading: false,
      value: undefined,
    })
  ));

  expect(result.current[0].isLoading).toBe(false);
});

test('should set an initial value with a function', () => {
  const { result } = renderHook(() => (
    useDeepState(() => ({
      isLoading: false,
      value: undefined,
    }))
  ));

  expect(result.current[0].isLoading).toBe(false);
});

test('should update a top-level property', () => {
  const { result } = renderHook(() => (
    useDeepState({
      isLoading: false,
      value: undefined,
    })
  ));

  act(() => {
    result.current[1]('isLoading', true);
  });

  expect(result.current[0].isLoading).toBe(true);
});

test('should update a nested property', () => {
  const { result } = renderHook(() => (
    useDeepState({
      name: {
        first: 'John',
        last: 'Doe',
      },
    })
  ));

  act(() => {
    result.current[1]('name.first', 'Frank');
  });

  expect(result.current[0].name.first).toBe('Frank');
});
