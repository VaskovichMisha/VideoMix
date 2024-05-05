<template>
  <div class="upload">
    <video
        v-if="videoUrl"
        :src="videoUrl"
        class="upload__video"
        autoplay
        loop="loop"
    />
    <div class="upload__content">
      <img src="@/assets/svg/video-upload.svg" alt="">
      <span>Загрузите или перетащите вертикальное видео формата mp4 до 30 Мб</span>
    </div>
    <div class="upload__btn">
      <label v-if="!videoUrl" for="file_uploader">
        Выбрать
      </label>
      <input
          @change="handleFileUpload"
          type="file"
          id="file_uploader"
          accept="video/*"
      >
    </div>
    <div v-if="false" class="upload__loader">
      <Loader />
      <span>Идет загрузка видео...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, defineProps, defineEmits, PropType , onUnmounted, watch } from 'vue';
import Loader from "@/components/UI/loader/loader.vue";

const props = defineProps({
  fileUploaded: {
    type: [File, null] as PropType<File | null>
  }
});

const emit = defineEmits(['upload-file'])

const videoUrl: Ref<string> = ref('')

const handleFileInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = ''
}

const updateVideoUrl = (file: File) => {
  videoUrl.value = URL.createObjectURL(file)
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file !== null && file !== undefined) {
    updateVideoUrl(file)
    emit('upload-file', file)
    handleFileInputChange(event)
  }
}

watch(() => props.fileUploaded, (newValue, oldValue) => {
  if (newValue) {
    videoUrl.value = URL.createObjectURL(newValue)
  } else {
    videoUrl.value = ''
  }
})

onUnmounted(() => {
  if (videoUrl.value) {
    URL.revokeObjectURL(videoUrl.value)
  }
})
</script>

<style scoped lang="scss">
@import "uploadVideo";
</style>