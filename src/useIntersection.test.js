import { act, renderHook } from '@testing-library/react-hooks';
import useIntersection from './useIntersection';

test('should do nothing when IntersectionObserver is undefined', () => {
  const handler = jest.fn();
  const ref = { current: {} };

  renderHook(() => (
    useIntersection(ref, handler)
  ));

  expect(global.IntersectionObserver).toBeUndefined();

  expect(handler).not.toHaveBeenCalled();
});

test('should observe and unobserve an element', () => {
  const handler = jest.fn();
  const ref = { current: {} };
  const observe = jest.fn();
  const unobserve = jest.fn();

  const MockIntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
  }));

  global.IntersectionObserver = MockIntersectionObserver;

  const { unmount } = renderHook(() => (
    useIntersection(ref, handler)
  ));

  expect(MockIntersectionObserver).toHaveBeenCalled();

  expect(observe).toHaveBeenCalled();

  unmount();

  expect(unobserve).toHaveBeenCalled();
});

test('should execute the callback when an element resizes', () => {
  const handler = jest.fn();
  const ref = { current: {} };
  const observe = jest.fn();
  const unobserve = jest.fn();
  let callback;

  const MockIntersectionObserver = jest.fn((cb) => {
    callback = cb;

    return {
      observe,
      unobserve,
    };
  });

  global.IntersectionObserver = MockIntersectionObserver;

  const { result } = renderHook(() => (
    useIntersection(ref, handler)
  ));

  act(() => {
    callback([{ isIntersecting: true }]);
  });

  expect(result.current[0]).toBe(true);
});
