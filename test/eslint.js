const lint = require("mocha-eslint")

// ESLint as part of the tests
let paths = [
  "**/*.js",
  "**/*.vue",
  "**/.*.js",
  "!dist/**/*.js",
  "!node_modules/**/*.js",
  "!node_modules/**/*.vue",
  "!node_modules/**/.*.js",
]
let options = {
  contextName: "ESLint",
}
lint(paths, options)
