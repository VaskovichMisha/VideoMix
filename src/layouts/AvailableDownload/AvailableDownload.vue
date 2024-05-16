<template>
<div class="container">
  <div class="first-video__wrapper">
    <div class="upload" ref="container">
      <video
          v-if="urlDownloadVideo"
          :src="urlDownloadVideo"
          class="upload__video"
          autoplay
          loop="loop"
      />
      <div v-else-if="error" class="upload__loader">
        <span>{{ error }}</span>
      </div>
      <div v-else class="upload__loader">
        <Loader />
        <span>Идет обработка видео...</span>
      </div>
    </div>

    <div class="available-download">
      <div v-if="error" class="available-download__block">
        <div class="available-download__title">{{ error}}</div>
        <Button
            @click="backSticker"
            text="Вернуться назад"
            color="white"
        />
      </div>
      <div v-else class="available-download__loader">
        <div>
          <Loader v-if="!urlDownloadVideo" />
          <span>{{ taskInfo ? taskInfo : 'Идет обработка... ' }}</span>
        </div>
        <span v-if="!urlDownloadVideo">Пожалуйста, подождите. Процесс генерации может занять несколько минут.</span>
      </div>
      <div v-if="urlDownloadVideo" class="available-download__link">
        <span>Поделиться: </span>
        <a href="#">https://dream-14.online/app/videomix/project22</a>
      </div>
      <div v-if="urlDownloadVideo" class="available-download__block">
        <div class="available-download__buttons">
          <a :href="urlDownloadVideo" download>Скачать</a>
          <div class="available-download__btn-copy">
            <Button
                @click="generateCopy"
                text="Сгенерировать копию"
                color="white"
            />
            <TextHints
                text-hint="Эта функция позволяет создать новую уникальную версию вашего видео с теми же параметрами уникализации, что вы выбирали, но с рандомизированными (случайными) значениями каждого параметра. Это идеальный способ для создания дополнительных уникальных версий, которые помогут максимизировать ваше присутствие и влияние на видеоплощадках."
            />
          </div>
          <button @click="router.push('/first-video')" class="available-download__button">
            Загрузить новое видео
          </button>
        </div>
        <span>* Ссылка на скачивание доступна 24 часа после генерации.</span>
        <div class="available-download__copies">
          <!--        <div class="available-download__copy">-->
          <!--          <span>Копия 1</span>-->
          <!--          <span>|</span>-->
          <!--          <button>Скачать</button>-->
          <!--        </div>-->
          <!--        <div class="available-download__copy">-->
          <!--          <span>Копия 2</span>-->
          <!--          <span>|</span>-->
          <!--          <Loader width="24" />-->
          <!--          <span> Идет обработка... Процесс генерации может занять несколько минут.</span>-->
          <!--        </div>-->
        </div>
      </div>
    </div>
  </div>
</div>
<!--  <Notification-->
<!--      :error="error"-->
<!--  />-->
</template>

<script setup lang="ts">
import Button from "@/components/UI/Button/Button.vue";
import Loader from "@/components/UI/Loader/loader.vue";
import Notification from "@/components/Notification/Notification.vue";

import { computed, ref, watch, defineEmits } from "vue";
import { useStore } from 'vuex'
import router from "@/router";
import TextHints from "@/components/UI/TextHints/TextHints.vue";

const store = useStore()

const urlDownloadVideo = computed(() => {
return store.state.video.urlDownloadVideo
})

const taskInfo = computed(() => {
return store.state.video.taskInfo
})

const error = computed(() => {
return store.state.notifications.error
})

const backSticker = () => {
router.push('/second-video/add-sticker')
store.commit('notifications/CLEAR_ERROR')
}

const generateCopy = () => {
  store.dispatch('video/videoProcessing', store.state.video.dataVideoProcess)
}


</script>

<style scoped lang="scss">
@import "availableDownload";
</style>