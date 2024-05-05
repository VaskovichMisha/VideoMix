<template>
  <div class="container">
    <div class="second-video__wrapper">
      <UploadVideo
          @upload-file="uploadFile"
          :fileUploaded="fileUploaded"
      />
      <div class="second-video__content">
        <div v-if="!fileUploaded" class="second-video__without-video">
          <span>Выберите второе видео для склейки или пропустите шаг</span>
          <div class="second-video__without-video-buttons">
            <div>
              <label for="file_uploader">
                Загрузить видео
              </label>
              <Button
                  text="Вернуться назад"
                  color="white"
                  @click="$router.push('/second-video')"
              />
            </div>
            <button>Пропустить шаг</button>
          </div>
        </div>
        <div v-else class="second-video__select-options">
          <RouterView
              @back-upload="backUpload"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadVideo from "@/components/UploadVideo/UploadVideo.vue";
import Button from "@/components/UI/Button/Button.vue";

import router from "@/router";
import { ref } from "vue";

const fileUploaded = ref<File | null>(null)

const uploadFile = (file: File) => {
  fileUploaded.value = file
  router.push('/second-video/success-upload')
}

const backUpload = () => {
  fileUploaded.value = null
}

</script>

<style scoped lang="scss">
@import "secondVideoUpload";
</style>