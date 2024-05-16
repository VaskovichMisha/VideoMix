<template>
  <div>
    <div class="select-second-video">
      <div class="select-second-video__title">
        <span>Выберите второе видео для склейки или пропустите шаг</span>
        <TextHints
            text-hint="Склейка вашего видео с другим может значительно увеличить его уникальность. Это также отличная возможность добавить во вторую часть видео призыв к действию или дополнительную информацию, которая может стимулировать взаимодействие зрителей. Если у вас нет подходящего второго видео, вы можете пропустить этот шаг."
        />
      </div>

      <div class="select-second-video__buttons">
        <div>
          <label for="file_uploader">
            Загрузить видео
          </label>
          <Button
              text="Вернуться назад"
              color="white"
              @click="backFirstVideo"
          />
        </div>
        <button @click="$router.push('/second-video/add-sticker')">Пропустить шаг</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/UI/Button/Button.vue";

import router from "@/router";
import {useStore} from "vuex";
import TextHints from "@/components/UI/TextHints/TextHints.vue";

const store = useStore()

const backFirstVideo = () => {
  router.push('/first-video')
  store.commit('video/CLEAR_LOADING_FILES', 'video1_url')
}
</script>

<style scoped lang="scss">
@import "selectSecondVideo";
</style>