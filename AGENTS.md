# Agent Guidelines for authwds

This document outlines the conventions and commands for agentic coding in this repository.

## Build/Lint/Test Commands

- **Build**: `bun run build`
- **Lint**: `bun run lint`
- **Run development server**: `bun run dev`
- **Start production server**: `bun run start`
- **Single Test**: This project does not have explicit test scripts defined in `package.json`. Please refer to the testing framework's documentation (if any) for running individual tests.

## Code Style Guidelines

### Formatting

- **Prettier**:
  - Semicolons: No (semi: false)
  - Single Quotes: No (singleQuote: false)
  - Tabs: No (useTabs: false)
  - Tab Width: 2 spaces (tabWidth: 2)
  - Trailing Commas: ES5 (trailingComma: es5)
  - Print Width: 80 characters (printWidth: 80)
  - Bracket Spacing: Yes (bracketSpacing: true)
  - Arrow Parens: Avoid (arrowParens: avoid)
  - End of Line: LF (endOfLine: lf)

### Linting (Oxlint)

- Various linting rules are enforced as warnings, including: `for-direction`, `no-async-promise-executor`, `no-caller`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-eval`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-useless-rename`, `no-with`, `require-yield`, `use-isnan`, `valid-typeof`.
- Specific `oxc` rules: `bad-array-method-on-arguments`, `bad-char-at-comparison`, `bad-comparison-sequence`, `bad-min-max-func`, `bad-object-literal-comparison`, `bad-replace-all-arg`, `const-comparisons`, `double-comparisons`, `erasing-op`, `missing-throw`, `number-arg-out-of-range`, `only-used-in-recursion`, `uninvoked-array-callback`.
- Specific `typescript` rules: `no-duplicate-enum-values`, `no-extra-non-null-assertion`, `no-misused-new`, `no-non-null-asserted-optional-chain`, `no-this-alias`, `no-unnecessary-parameter-property-assignment`, `no-unsafe-declaration-merging`, `no-useless-empty-export`, `no-wrapper-object-types`, `prefer-as-const`, `triple-slash-reference`.
- Specific `unicorn` rules: `no-await-in-promise-methods`, `no-empty-file`, `no-invalid-fetch-options`, `no-invalid-remove-event-listener`, `no-new-array`, `no-single-promise-in-promise-methods`, `no-thenable`, `no-unnecessary-await`, `no-useless-fallback-in-spread`, `no-useless-length-check`, `no-useless-spread`, `prefer-set-size`, `prefer-string-starts-ends-with`.
- **Imports**: `import/newline-after-import` is an error, meaning there should be a newline after the import statements.

### Types (TypeScript)

- **Strictness**: `strict: true` is enabled, enforce strict type checking.
- **Module Resolution**: `bundler`
- **JSX**: `preserve`
- **Path Aliases**: `@/*` maps to `./*`

### Naming Conventions, Error Handling, etc.

- No explicit naming conventions or error handling guidelines were found in the configuration files. Agents should follow common TypeScript/JavaScript best practices and existing patterns in the codebase.
