<!--
Get your module up and running quickly.
Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt alt:V Integration
- Package name: nuxt-altv
- Description: My new Nuxt module
-->

# Nuxt alt:V Integration

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for interacting with the alt:V Client EarlyAuth & WebView APIs.     
Note: this module is just a wrapper around the alt:V API, it does not provide any functionality on its own.     
If you have a feature request, please open an issue.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🔐 &nbsp;[EarlyAuth](https://docs.altv.mp/articles/earlyauth.html) API
    - 📦 &nbsp; Simplified [Storage](https://docs.altv.mp/articles/earlyauth.html#store-and-retrieve-data) API
    - ℹ️ &nbsp; Easy [alt:V Username](https://docs.altv.mp/articles/earlyauth.html#request-altv-name) retrieval
    - ⚙️ &nbsp; Full API access without having to use alt:V events manually
- 🖥️ &nbsp;[WebView](https://altv.mp) API Polyfills for testing in browser

## Quick Setup

1. Add `nuxt-altv` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-altv
# Using yarn
yarn add --dev nuxt-altv
# Using npm
npm install --save-dev nuxt-altv
```

2. Add `nuxt-altv` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-altv'
  ]
})
```

That's it! You can now use Nuxt alt:V Integration in your Nuxt app ✨

## Development

```bash
# Install dependencies
pnpm install
# Generate type stubs
pnpm run dev:prepare
# Develop with the playground
pnpm run dev
# Build the playground
pnpm run dev:build
# Run ESLint
pnpm run lint
# Run Vitest
pnpm run test
pnpm run test:watch
# Release new version
pnpm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-altv/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-altv

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-altv.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-altv

[license-src]: https://img.shields.io/npm/l/nuxt-altv.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-altv

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com