<template>
  <div :style="`display: ${display}; font-style: italic;`">
    <slot name="before" />
    <slot />
    <slot name="after" />
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "Italic",
  props: {
    display: {
      type: String,
      default: "inline-block",
    },
  },
})
</script>
