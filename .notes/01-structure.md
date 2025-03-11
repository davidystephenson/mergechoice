# Structure

## `src/index.ts`

The `src/index.ts` file defines the entry point for the library.
`index.ts` should not define anything, it should only import from other files and export them.
Not every function, type, or const needs to be exported, only the ones that are intended to be used outside the library as required by the tests.

## `tests/`

The `tests/` directory contains the tests for the library.
The tests should only import from `src/index.ts` and not from other files in `src/`.

### `tests/feature/`

The `tests/feature/` directory contains code related to a specific feature of the library.
The tests should be named like `[name].test.ts`.



