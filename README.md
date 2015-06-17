# SystemJS Examples
Example ES6 module loading scenarios with [SystemJS](https://github.com/systemjs/systemjs).

# Getting Started

Install dev dependencies
```bash
npm install
```

Execute initial build and watch sources
```bash
gulp
```

Start the BrowserSync server and navigate to `localhost:7000/views`
```bash
gulp sync
```

# Scenarios

### Bundled
Manually build a bundled package and output to `target/bundled`
```bash
gulp bundle
```

### Executable
Manually build a self-contained executable and output to `target/executable`
```bash
gulp executable
```

### Transpiled
Manually transpile the sources to `target/transpiled`. Transpilation is performed automatically by `gulp.watch` when the default `gulp` task is executed.
```bash
gulp transpile
```

### Runtime
Dynamically transpile at runtime – `views/runtime.html`
