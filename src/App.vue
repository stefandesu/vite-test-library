<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png">
  <p>
    <Bold>
      Bold component with only default slot
    </Bold>
  </p>
  <p>
    <Italic>
      Italic component with only default slot
    </Italic>
  </p>
  <p>
    <Bold>
      <template #before>
        --- Before slot ---
      </template>
      <template #default>
        Default slot.
      </template>
      <template #after>
        --- After slot ---
      </template>
    </Bold>
  </p>
  <p>
    <Bold>
      <Italic>
        Combining both Bold and Italic
      </Italic>
    </Bold>
  </p>
  <Italic>
    Italic inline before bold test
  </Italic>
  <Bold
    display="block"
    class="bold-test">
    Testing with display: block; and width+height
  </Bold>
</template>

<script>
import { defineComponent } from "vue"
import Bold from "./components/bold/Bold.vue"
import Italic from "./components/italic/Italic.vue"

export default defineComponent({
  name: "App",
  components: {
    Bold,
    Italic,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bold-test {
  background-color: lightblue;
  height: 50px;
}
</style>
