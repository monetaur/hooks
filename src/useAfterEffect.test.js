import { renderHook } from '@testing-library/react-hooks';
import useAfterEffect from './useAfterEffect';

test('should execute after a dependency changes', () => {
  let triggerCount = 0;

  const { rerender } = renderHook(
    ({ count }) => useAfterEffect(
      () => { triggerCount += 1; },
      [count],
    ),
    { initialProps: { count: 0 } },
  );

  expect(triggerCount).toBe(0);

  rerender({ count: 0 });

  expect(triggerCount).toBe(0);

  rerender({ count: 1 });

  expect(triggerCount).toBe(1);
});
