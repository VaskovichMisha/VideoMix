<template>
  <div class="checkbox">
    <input
        type="checkbox"
        :id="'checkbox_' + props.checkbox.id"
    >
    <label :for="'checkbox_' + props.checkbox.id">
      {{ props.checkbox.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  checkbox: {
    type: Object,
    default: {}
  }
})
</script>

<style scoped lang="scss">
@import "checkbox";
</style>