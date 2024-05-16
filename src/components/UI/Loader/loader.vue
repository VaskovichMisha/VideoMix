<template>
  <div class="loader">
    <img :style="{ 'width': props.width + 'px' }" src="../../../assets/svg/loader.svg" alt="">
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  width: {
    type: String,
  }
})
</script>

<style scoped lang="scss">
@import "loader";
</style>