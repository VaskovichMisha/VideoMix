<template>
  <div class="add-sticker">
    <div class="add-sticker__title">
      <span>Добавьте стикер на видео или пропустите шаг</span>
      <TextHints text-hint="Добавление стикера на ваше видео не только украшает его и стимулирует взаимодействия со зрителями, но и способствует уникализации. Вы можете использовать эту функцию для вставки водяного знака, анимированного стикера с призывом к действию, логотипа бренда или любого другого изображения. Если вам не нужно добавлять дополнительные элементы, можете пропустить этот шаг." />
    </div>
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
      <button @click="skipAddSticker">Пропустить шаг</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/UI/Button/Button.vue";

import { defineEmits } from 'vue'
import router from "@/router";
import { useStore } from "vuex";
import TextHints from "@/components/UI/TextHints/TextHints.vue";

const store = useStore()

const emits = defineEmits([
  'back-upload',
  'upload-sticker',
  'skip-add-sticker'
])

const backUpload = () => {
  emits('back-upload')
  router.push('/second-video')
  store.commit('video/CLEAR_LOADING_FILES', 'video2_url')
}

const handleStickerUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if(file !== null && file !== undefined) {
    emits('upload-sticker', file)
  }
}

const skipAddSticker = () => {
  router.push('/available-download')
  emits('skip-add-sticker')
}

</script>

<style scoped lang="scss">
@import "addSticker";
</style>