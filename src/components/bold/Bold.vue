<template>
  <div :style="`display: ${display}; font-weight: bold;`">
    <slot name="before" />
    <slot />
    <slot name="after" />
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "Bold",
  props: {
    display: {
      type: String,
      default: "inline-block",
    },
  },
})
</script>
