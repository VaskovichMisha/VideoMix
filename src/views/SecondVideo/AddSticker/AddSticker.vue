<template>
  <div class="add-sticker">
    <span class="add-sticker__title">Добавьте стикер на видео или пропустите шаг</span>
    <div class="add-sticker__block">
      <div class="add-sticker__buttons">
        <Button
            text="Загрузить стикер"
            color="purple"
        />
        <Button
            text="Вернуться назад"
            color="white"
            @click="$router.push('/second-video/success-upload')"
        />
      </div>
      <span>* Поддерживаемые форматы jpg, png и gif</span>
      <button @click="$router.push('/second-video/available-download')">Пропустить шаг</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "@/components/UI/Button/Button.vue";
</script>

<style scoped lang="scss">
@import "addSticker";
</style>