import { renderHook } from '@testing-library/react-hooks';
import useResize from './useResize';

test('should do nothing when ResizeObserver is undefined', () => {
  const handler = jest.fn();
  const ref = { current: {} };

  renderHook(() => (
    useResize(ref, handler)
  ));

  expect(global.ResizeObserver).toBeUndefined();

  expect(handler).not.toHaveBeenCalled();
});

test('should observe and unobserve an element', () => {
  const handler = jest.fn();
  const ref = { current: {} };
  const observe = jest.fn();
  const unobserve = jest.fn();

  const MockResizeObserver = jest.fn(() => ({
    observe,
    unobserve,
  }));

  global.ResizeObserver = MockResizeObserver;

  const { unmount } = renderHook(() => (
    useResize(ref, handler)
  ));

  expect(MockResizeObserver).toHaveBeenCalled();

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

  const MockResizeObserver = jest.fn((cb) => {
    callback = cb;

    return {
      observe,
      unobserve,
    };
  });

  global.ResizeObserver = MockResizeObserver;

  renderHook(() => (
    useResize(ref, handler)
  ));

  callback([{ contentRect: { width: 100, height: 100 } }]);

  expect(handler).toHaveBeenCalledWith({ width: 100, height: 100 });
});
