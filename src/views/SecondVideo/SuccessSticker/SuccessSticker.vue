<template>
  <div class="success-upload">
    <span class="success-upload__title">Выберите расположение стикера</span>
    <div class="success-upload__buttons">
      <Button
          text="Начать обработку"
          color="purple"
          @click="startProcessing"
      />
      <Button
          text="Вернуться назад"
          color="white"
          @click="backSticker"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/UI/Button/Button.vue";

import { defineEmits } from 'vue'
import router from "@/router";

const emits = defineEmits([
  'start-processing',
  'back-sticker'
])

const startProcessing = () => {
  emits('start-processing')
  router.push('/available-download')
}

const backSticker = () => {
  emits('back-sticker')
  router.push('/second-video/add-sticker')
}


</script>

<style lang="scss" scoped>
@import "successSticker";
</style>