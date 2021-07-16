<template>
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
  <p>
    Item:
    <item-name :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }" />
  </p>
  <p>
    Item (no label):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :show-label="false" />
  </p>
  <p>
    Item (no notation):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :show-notation="false" />
  </p>
</template>

<script>
import { defineComponent } from "vue"
import { Bold, Italic, ItemName } from "."

export default defineComponent({
  name: "App",
  components: {
    Bold,
    Italic,
    ItemName,
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
