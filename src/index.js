import * as components from "./components"

// Install method so that it can be used as a plugin.
export const install = (vue) => {
  for (let key in components) {
    vue.use(components[key])
  }
}

export * from "./components"

export default {
  ...components,
  install,
}
