<template>
  <span>
    <b v-if="showNotation">
      {{ notation }}
    </b>
    <!-- TODO: Find out why there is no space without forcing it... -->
    <template v-if="showLabel && showNotation">&nbsp;</template>
    <template v-if="showLabel">
      {{ label }}
    </template>
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
      notation: computed(() => jskos.notation(props.item)),
      label: computed(() => jskos.prefLabel(props.item, { fallbackToUri: !props.showNotation })),
    }
  },
})
</script>
