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

## Continuous Integration
This package uses GitHub Actions. When a pull request is created, the codebase will automatically be checked for linter errors and test failures.

### Releases
This package uses [`semantic-release`](https://semantic-release.gitbook.io). By default, the package expects commits to follow the [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). That means that commits intended to trigger a new release should look like these:

Logged Non-Release Commits
* docs: Add documentation for useLocalStorage
* docs(useLocalStorage): Add documentation for useLocalStorage
* style: Change indentation from 4 to 2 spaces
* style(spaces): Change indentation from 4 to 2 spaces
* refactor: Clean up Webpack config file
* refactor(webpack config): Clean up Webpack config file
* perf: Replace react-helmet to resolve memory issues
* perf(react-helmet): Replace react-helmet to resolve memory issues
* test: Add tests for Page component
* test(Page): Add tests for Page component
* chore: 1.0.0
* chore(release): 1.0.0

Minor/Feature Release Commits
* feat: Add useAnotherOne hook for DJ Khaled quotes
* feat(useAnotherOne): Add useAnotherOne hook for DJ Khaled quotes

Patch Release Commits
* fix: Resolve equality issue in useDeepState
* fix(useDeepState): Resolve equality issue in useDeepState

Major/Breaking Release Commits
* BREAKING CHANGE: Button props have changed to align with ever-changing style guide

## Continuous Delivery
When a commit is pushed to the master branch, the following steps will occur:
1. Run linters and tests
2. Run build
3. Read version from package.json
4. Run `semantic-release` command
5. Read version from package.json
6. If version changed, create a release PR `version-bump/{VERSION}` with the updated version number
7. Auto approve the release PR after CI processes complete
8. Auto merge the release PR
