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
          @click="$emit('back-upload')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import Button from "@/components/UI/Button/Button.vue";
</script>

<style lang="scss" scoped>
@import "successUpload";
</style>