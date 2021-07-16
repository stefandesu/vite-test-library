<template>
  <span class="vite-test-library-itemName">
    <span>{{ notation }}</span>
    <span>{{ label }}</span>
  </span>
</template>

<script>
import { defineComponent, computed } from "vue"
import * as jskos from "jskos-tools"

export default defineComponent({
  name: "ItemName",
  props: {
    item: {
      type: Object,
      required: true,
    },
    showNotation: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return {
      notation: computed(() =>
        props.showNotation
          ? jskos.notation(props.item)
          : "",
      ),
      label: computed(() =>
        props.showLabel
          ? jskos.prefLabel(props.item, { fallbackToUri: !props.showNotation })
          : "",
      ),
    }
  },
})
</script>

<style>
.vite-test-library-itemName > *:first-child {
  font-weight: bold;
}
</style>
