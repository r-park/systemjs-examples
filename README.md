# SystemJS Examples
Example ES6 module loading scenarios with [SystemJS](https://github.com/systemjs/systemjs).
- SystemJS and SystemJS Builder
- Babel
- TypeScript master (1.5.x)
- Gulp 4


# Getting Started

Install dev dependencies
```bash
npm install
```

Execute initial builds and watch sources. Built artifacts will be output to `target/*`
```bash
gulp
```

# Scenarios

### Bundle
Manually build a bundled package and output to `target/es5/bundled`
```bash
gulp bundle
```
Typescript output to `target/ts/bundled`.
```bash
gulp transpile:ts
gulp bundle:ts
```

### Executable
Manually build a self-contained executable and output to `target/es5/executable`
```bash
gulp executable
```
Typescript output to `target/ts/executable`.
```bash
gulp transpile:ts
gulp executable:ts
```

### Transpile
Manually transpile the sources to `target/es5/transpiled`. Transpilation is performed automatically by `gulp.watch` when the default `gulp` task is executed.
```bash
gulp transpile
```
Typescript output to `target/ts/transpiled`.
```bash
gulp transpile:ts
```

### Runtime
Dynamically transpile at runtime – `views/runtime.html`
