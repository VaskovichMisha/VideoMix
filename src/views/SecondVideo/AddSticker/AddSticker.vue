<template>
  <div class="add-sticker">
    <span class="add-sticker__title">Добавьте стикер на видео или пропустите шаг</span>
    <div class="add-sticker__block">
      <div class="add-sticker__buttons">
        <div class="add-sticker__file">
          <label for="sticker">Загрузить стикер</label>
          <input @change="handleStickerUpload" type="file" id="sticker">
        </div>
        <Button
            text="Вернуться назад"
            color="white"
            @click="backUpload"
        />
      </div>
      <span>* Поддерживаемые форматы jpg, png и gif</span>
      <button @click="$router.push('/second-video/available-download')">Пропустить шаг</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/UI/Button/Button.vue";

import { defineEmits } from 'vue'
import router from "@/router";

const emits = defineEmits([
  'back-upload',
  'upload-sticker'
])
const backUpload = () => {
  emits('back-upload')
  router.push('/second-video')
}

const handleStickerUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file !== null && file !== undefined) {
    emits('upload-sticker', file)
  }

  console.log(file)
}

</script>

<style scoped lang="scss">
@import "addSticker";
</style>