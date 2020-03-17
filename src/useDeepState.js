import { useReducer } from 'react';

function isObject(obj) {
  return typeof obj === 'object' && !!obj && !Array.isArray(obj);
}

function setProp(obj, key, value) {
  const properties = key.split('.');
  let currentProperty = obj;
  while (properties.length) {
    const nextProperty = properties.shift();
    // If there are more properties left, drill down to the desired one, otherwise update the value
    if (properties.length) {
      // Set the cursor to the next nested property
      currentProperty[nextProperty] = currentProperty[nextProperty] || {};
      currentProperty = currentProperty[nextProperty];
    } else if (isObject(value)) {
      // Merge the new value with the existing value
      currentProperty[nextProperty] = {
        ...currentProperty[nextProperty],
        ...value,
      };
    } else {
      // Set the state
      currentProperty[nextProperty] = value;
    }
  }
  return obj;
}

function reducer(oldState, key, value) {
  const newState = { ...oldState };
  setProp(newState, key, value);
  return newState;
}

export default function useDeepState(init) {
  const initialValue = typeof init === 'function' ? undefined : init;
  const initialValueFn = typeof init === 'function' ? init : undefined;
  return useReducer(reducer, initialValue, initialValueFn);
}
