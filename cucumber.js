// eslint-disable-next-line no-undef
module.exports = {
  // Configuración para pruebas ui
  ui: {
    "tags": "@ui",
    "dryRun": false,
    "formatOptions": {
      "snippetInterface": "async-await"
    },
    "paths": [
      "./tests/ui/features/**/*.feature"
    ],
    "require": [
      "./tests/ui/steps/**/*.ts",
      "./tests/hooks/hooks.ts"
    ],
    "requireModule": [
      "ts-node/register"
    ],
    "format": [],
    "publishQuiet": false,
    "parallel": 1
  },
  // Configuración para pruebas de API
  api: {
    "tags": "@api",
    "dryRun": false,
    "formatOptions": {
      "snippetInterface": "async-await"
    },
    "paths": [
      "./tests/api/features/**/*.feature"
    ],
    "require": [
      "./tests/api/steps/**/*.ts",
      "./tests/hooks/hooks.ts"
    ],
    "requireModule": [
      "ts-node/register"
    ],
    "format": [],
    "publishQuiet": false,
    "parallel": 1
  }
}