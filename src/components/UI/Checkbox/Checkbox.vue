<template>
  <div class="checkbox">
    <input
        type="checkbox"
        :id="'checkbox_' + checkbox.id"
        :checked="isChecked"
        @change="handleChange"
    >
    <label :for="'checkbox_' + checkbox.id">
      {{ checkbox.label }}
    </label>
    <TextHints
        :text-hint="checkbox.textHint"
        :visible="isHintVisible"
        @toggle-hint="toggleHint"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import TextHints from "@/components/UI/TextHints/TextHints.vue";

const props = defineProps({
  checkbox: {
    type: Object,
    required: true
  },
  isHintVisible: {
    type: Boolean,
  },
})

const emits = defineEmits(['change-checkbox', 'toggle-hint'])

const isChecked = ref(props.checkbox.checked)

const handleChange = (event: any) => {
  isChecked.value = event.target.checked
  emits('change-checkbox', isChecked.value)
}

const toggleHint = () => {
  emits('toggle-hint')
}
</script>

<style scoped lang="scss">
@import "checkbox";
</style>