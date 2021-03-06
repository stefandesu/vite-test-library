# vite-test-library
[![Test and build](https://github.com/stefandesu/vite-test-library/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/stefandesu/vite-test-library/actions/workflows/test-and-build.yml)
[![GitHub package version](https://img.shields.io/github/package-json/v/stefandesu/vite-test-library.svg?label=version)](https://github.com/stefandesu/vite-test-library)
[![NPM package name](https://img.shields.io/badge/npm-@stefandesu/vite--test--library-blue.svg)](https://www.npmjs.com/package/@stefandesu/vite-test-library)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

> Using [Vite](https://vitejs.dev) for creating Vue 3 component libraries.

## Table of Contents <!-- omit in toc -->
- [Background](#background)
- [To-Dos for adjusting to your project](#to-dos-for-adjusting-to-your-project)
- [Development](#development)
- [Using the library](#using-the-library)
  - [Node](#node)
  - [Browser](#browser)
- [Note about external dependencies](#note-about-external-dependencies)
- [Notes about building a Vue 3 application with Vite](#notes-about-building-a-vue-3-application-with-vite)
  - [Legacy browser support](#legacy-browser-support)
  - [Base path](#base-path)
  - [Defining environment variables](#defining-environment-variables)
- [Publish](#publish)
- [License](#license)

## Background
We need to create some Vue 3 component libraries and I wanted to use Vite for this since it offers a great developer experience. A fast hot-reloading dev server as well as fast builds are already included, making it the obvious choice. However, creating a component library with it wasn't as easy as I had hoped. I had trouble in particular with it being tree-shakable. I'm still not sure whether I'm doing things correctly, but they seem to be working as expected.

Some requirements:
- Use Vite for development and builds.
- Offer browser builds.
- Allow it to be tree-shakable when used as a dependency in another project. (This means that only the code that is really used is going to be included in a build.)
- Add other developer tools that we are using (ESLint via [eslint-config-gbv](https://github.com/gbv/eslint-config-gbv), testing, etc.).

To-dos:
- [x] Add pre-commit rules
- [ ] Add testing
  - See [here](https://v3.vuejs.org/guide/testing.html#introduction) for Vue-specific testing
- [x] Add dev branch and adjust release script accordingly
- [ ] Extend README
- [x] Add GitHub workflows for tests, building, and releases (GitHub + npm)
- [ ] Consider adding JSDoc for documentation
- [ ] Consider adding [TypeScript declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) (we might be able to generate these from JSDoc tags after we added them)
- [ ] Figure out why built library does not work in https://observablehq.com

## To-Dos for adjusting to your project
- Copy this repo: `npx degit https://github.com/stefandesu/vite-test-library.git your-library-name`
- Update GitHub release workflow: `sed -i '' 's/vite-test-library/your-library-name/g' .github/workflows/release.yml`
- Update package.json:
  - `sed -i '' 's/vite-test-library/your-library-name/g' package.json`
  - Also adjust name (namespace), version, author, description
- Adjust package name in `vite.config.js`
- Adjust README
  - Badges
  - ...
- Adjust license if necessary
- Create Git repository: `git init -b main`
- Add remote and push repo to GitHub
  - ...
- Add `NPM_TOKEN` secret to GitHub project (Settings - Secrets - New repository secrets)
- Create a dev branch and push it to GitHub:
  - `git checkout -b dev`
  - `git push -u origin dev`
- ...

## Development
```bash
git clone https://github.com/stefandesu/vite-test-library.git
cd vite-test-library
npm install
npm run dev # for Vite dev server
npm run build # for Vite build
```

## Using the library

### Node

1\. Add the library to your Vue project:
```bash
npm install @stefandesu/vite-test-library
```

2a. Add all components globally (in `src/main.js` for your project):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import * as ViteTestLibrary from "@stefandesu/vite-test-library"
app.use(ViteTestLibrary)

// Import stylesheet
import "@stefandesu/vite-test-library/dist/style.css"

app.mount('#app')
```

2b. Add individual components globally (tree-shakable):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { Bold } from "@stefandesu/vite-test-library"
app.use(Bold)

// Import stylesheet
import "@stefandesu/vite-test-library/dist/style.css"

app.mount('#app')
```

2c. Add individual components where needed (e.g. in some SFC, tree-shakable):
```js
import { defineComponent } from "vue"
import { Bold } from "@stefandesu/vite-test-library"
// Import stylesheet
import "@stefandesu/vite-test-library/dist/style.css"

export default defineComponent({
  // ...
  components: {
    Bold,
  },
  // ...
})
```

### Browser
The library can be used in the browser, for example via jsDelivr.

[![](https://data.jsdelivr.com/v1/package/npm/@stefandesu/vite-test-library/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@stefandesu/vite-test-library)

Fully working HTML example:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue App</title>
    <!-- Our library's stylesheet here (adjust version if necessary) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@stefandesu/vite-test-library@0.2/dist/style.css">
  </head>
  <body>
    <div id="app">
      <Bold>
        Test bold
      </Bold>
      <Italic>
        Test italic
      </Italic>
    </div>
    <!-- Vue 3 production build -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    <!-- Our library (adjust version if necessary) -->
    <script src="https://cdn.jsdelivr.net/npm/@stefandesu/vite-test-library@0.2/dist/vite-test-library.umd.min.js"></script>
    <script>
      // Here, we are creating an empty Vue app and include the library as a plugin.
      Vue.createApp({}).use(ViteTestLibrary).mount("#app")
    </script>
  </body>
</html>
```

## Note about external dependencies
As an example, a component `ItemName` was added to this repository that depends on [jskos-tools](https://github.com/gbv/jskos-tools). However, jskos-tools is not part of the build, which means that it must be installed via npm or included via the `<script>` tag.

The nice thing about this is that if that particular component is not used or needed, it is not necessary to install/include jskos-tools.

## Notes about building a Vue 3 application with Vite

### Legacy browser support
By default, [only modern browsers are supported by Vite's builds](https://vitejs.dev/guide/build.html#browser-compatibility). In most cases, legacy browsers (which does **not** mean IE11, but rather older versions of Firefox and Chrome) should be supported as well. It is recommended to use [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) for this.

### Base path
In many cases, applications will not be hosted under the root base path (`/`). In those cases, it is necessary to define the `base` option in `vite.config.js`, or provide it as an argument for the build command. See also: [Vite Docs: Public Base Path](https://vitejs.dev/guide/build.html#public-base-path)

### Defining environment variables
Some packages use the `process.browser` variable to determine whether the code is run in the browser or in Node.js. Vite's build does not define this variable by default. If necessary, it can be defined in `vite.config.js` like this:

```js
export default defineConfig({
  // ...
  define: {
    "process.browser": true,
  },
})
```

For a detailed example that also includes other `process.env` variables, see [the `vite.config.js` in coli-ana](https://github.com/gbv/coli-ana/blob/main/vite.config.js).

## Publish
Please work on the `dev` branch during development (or better yet, develop in a feature branch and merge into `dev` when ready).

When a new release is ready (i.e. the features are finished, merged into `dev`, and all tests succeed), run the included release script (replace "patch" with "minor" or "major" if necessary):

```bash
npm run release:patch
```

This will:
- Check that we are on `dev`
- Run tests and build to make sure everything works
- Make sure `dev` is up-to-date
- Run `npm version patch` (or "minor"/"major")
- Push changes to `dev`
- Switch to `main`
- Merge changes from `dev`
- Push `main` with tags
- Switch back to `dev`

After running this, GitHub Actions will **automatically publish the new version to npm**. It will also create a new GitHub Release draft. Please **edit and publish the release draft manually**.

## License
MIT Copyright (c) 2021 Stefan ??????
