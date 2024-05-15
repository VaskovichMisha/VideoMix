<template>
  <div class="notification">
    <span>Ошибка: {{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';

const props = defineProps({
  error: {
    type: [String, null] as PropType<String | null>,
  }
})

</script>

<style lang="scss" scoped>
@import "notification";
</style>