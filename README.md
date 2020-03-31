# hooks
A collection of useful React hooks

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fmonetaur%2Fhooks%2Fbadge%3Fref%3Dmaster&style=flat)](https://actions-badge.atrox.dev/monetaur/hooks/goto?ref=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Install
`npm install @monetaur/hooks`

## Implement
```javascript
import React from 'react';
import { useDeepState } from '@monetaur/hooks';

export default function LoginButton() {
  const [{ isLoading, value }, update] = useDeepState({
    isLoading: false,
    value: undefined
  });

  useEffect(() => {
    update('isLoading', true);
  }, [update]);

  return (
    <div>{isLoading ? 'Loading' : 'Not Loading'}</div>
  );
}
```
