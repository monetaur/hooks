import { renderHook, act } from '@testing-library/react-hooks';
import useDimensions from './useDimensions';

function mockRef() {
  const domRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };

  const ref = {
    current: {
      getBoundingClientRect: () => domRect,
    },
  };

  return { domRect, ref };
}

describe('usePrevious', () => {
  test('it supplies a full DOMRect object', () => {
    const { ref } = mockRef();
    const { result } = renderHook(() => useDimensions(ref));
    expect(Object.keys(result.current)).toEqual(['bottom', 'height', 'left', 'right', 'top', 'width']);
  });


  test('should observe and unobserve an element', () => {
    const observe = jest.fn();
    const unobserve = jest.fn();

    const MockResizeObserver = jest.fn(() => ({
      observe,
      unobserve,
    }));

    global.ResizeObserver = MockResizeObserver;

    const { ref } = mockRef();
    const { unmount } = renderHook(() => useDimensions(ref));

    expect(MockResizeObserver).toHaveBeenCalled();

    expect(observe).toHaveBeenCalled();

    unmount();

    expect(unobserve).toHaveBeenCalled();
  });

  test('should execute the callback when an element resizes', () => {
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

    const { domRect, ref } = mockRef();
    const { result } = renderHook(() => useDimensions(ref));

    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);

    domRect.width = 100;
    domRect.height = 100;

    act(() => {
      callback();
    });

    expect(result.current.width).toBe(100);
    expect(result.current.height).toBe(100);
  });
});
