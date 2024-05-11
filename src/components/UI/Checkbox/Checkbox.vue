<template>
  <div class="checkbox">
    <input
        type="checkbox"
        :id="'checkbox_' + props.checkbox.id"
        :checked="isChecked"
        @change="handleChange"
    >
    <label :for="'checkbox_' + props.checkbox.id">
      {{ props.checkbox.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
  checkbox: {
    type: Object,
    required: true
  }
})

const emits = defineEmits([
    'change-checkbox'
])

const isChecked = ref(props.checkbox.checked)

const handleChange = (event: any) => {
  isChecked.value = event.target.checked
  emits('change-checkbox', isChecked.value)
}
</script>

<style scoped lang="scss">
@import "checkbox";
</style>