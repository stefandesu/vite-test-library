<template>
  <span>
    <b v-if="showNotation">
      {{ notation }}
    </b>
    <template v-if="showLabel">
      {{ label }}
    </template>
  </span>
</template>

<script>
import { defineComponent, computed } from "vue"
import jskos from "jskos-tools"

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
      notation: computed(() => jskos.notation(props.item)),
      label: computed(() => jskos.prefLabel(props.item, { fallbackToUri: !props.showNotation })),
    }
  },
})
</script>
