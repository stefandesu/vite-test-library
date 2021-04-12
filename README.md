# vite-test-library
Using [Vite](https://vitejs.dev) for creating Vue 3 component libraries.

## Table of Contents <!-- omit in toc -->
- [Background](#background)
- [Development](#development)
- [Using the library](#using-the-library)
  - [Node](#node)
  - [Browser](#browser)
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
- [ ] Add pre-commit rules
- [ ] Add testing
- [x] Add dev branch and adjust release script accordingly
- [ ] Extend README
- [ ] Add GitHub workflows for tests, building, and releases (GitHub + npm)
- [ ] Consider adding JSDoc for documentation
- [ ] Consider adding [TypeScript declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) (we might be able to generate these from JSDoc tags after we added them)

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

1. Add the library to your project:
```bash
npm install @stefandesu/vite-test-library
```

2a. Add all components globally (in `src/main.js` for your project):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import ViteTestLibrary from "@stefandesu/vite-test-library"
app.use(ViteTestLibrary)

app.mount('#app')
```

2b. Add individual components globally (tree-shakable):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { Bold } from "@stefandesu/vite-test-library"
app.use(Bold)

app.mount('#app')
```

2c. Add individual components where needed (e.g. in some SFC, tree-shakable):
```js
import { defineComponent } from "vue"
import { Bold } from "@stefandesu/vite-test-library"

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
    <!-- Our library -->
    <script src="https://cdn.jsdelivr.net/npm/@stefandesu/vite-test-library/dist/vite-test-library.umd.min.js"></script>
    <script>
      // Here, we are creating an empty Vue app and include the library as a plugin.
      Vue.createApp({}).use(ViteTestLibrary).mount("#app")
    </script>
  </body>
</html>
```

## Publish
**Note:** This is not yet fully implemented!

Please work on the `dev` branch during development (or better yet, develop in a feature branch and merge into `dev` when ready).

When a new release is ready (i.e. the features are finished, merged into `dev`, and all tests succeed), run the included release script (replace "patch" with "minor" or "major" if necessary):

```bash
npm run release:patch
```

This will:
- Check if we are on `dev`
- Run tests and build to make sure everything works
- Make sure `dev` is up-to-date
- Run `npm version patch` (or "minor"/"major")
- Push changes to `dev`
- Switch to `main`
- Merge changes from `dev`
- Push `main` with tags
- Switch back to `dev`

After running this, GitHub Actions will automatically publish the new version to npm. It will also create a new GitHub Release draft. Please edit and publish the release manually.

## License
MIT
