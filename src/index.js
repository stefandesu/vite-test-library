import * as components from "./components"

// Add install method to individual components
for (let component of Object.values(components)) {
  if (!component.install) {
    component.install = (vue) => {
      vue.component(component.name, component)
    }
  }
}

// Install method so that it can be used as a plugin.
export const install = (vue) => {
  for (let key in components) {
    vue.use(components[key])
  }
}

export * from "./components"

// Shared CSS
// import "./shared.css"
