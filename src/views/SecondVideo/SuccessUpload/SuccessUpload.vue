<template>
  <div class="success-upload">
    <span class="success-upload__title">Второе видео успешно загружено</span>
    <div class="success-upload__buttons">
      <Button
          text="Продолжить"
          color="purple"
          @click="$router.push('/second-video/add-sticker')"
      />
      <Button
          text="Вернуться назад"
          color="white"
          @click="backUpload"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/UI/Button/Button.vue";

import { defineEmits } from 'vue'
import router from "@/router";

const emits = defineEmits([
    'back-upload'
])
const backUpload = () => {
  emits('back-upload')
  router.push('/second-video')
}
</script>

<style lang="scss" scoped>
@import "successUpload";
</style>