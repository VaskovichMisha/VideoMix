<template>
  <div class="upload" ref="container">
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
    <img
        v-if="urlSticker"
        ref="sticker"
        class="upload__sticker"
        :src="urlSticker" alt=""
        @mousedown="startDrag"
        @mousemove="dragging"
        @mouseup="endDrag"
    >
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, defineProps, defineEmits, PropType , onUnmounted, watch } from 'vue';
import Loader from "@/components/UI/loader/loader.vue";

const props = defineProps({
  fileUploaded: {
    type: [File, null] as PropType<File | null>
  },
  urlSticker: {
    type: [String, null] as PropType<String | null>
  }
})

const emit = defineEmits(['upload-file'])

const videoUrl: Ref<string> = ref('')

let startX = 0
let startY = 0
const x = ref(0)
const y = ref(0)
let isDragging = false
const sticker = ref<HTMLImageElement | null>(null)
const container = ref<HTMLDivElement | null>(null)

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

//******** Перемещение Стикера *******
const startDrag = (event: MouseEvent) => {
  startX = event.clientX - x.value
  startY = event.clientY - y.value
  isDragging = true
  document.addEventListener('mousemove', dragging)
  document.addEventListener('mouseup', endDrag)
}

const dragging = (event: MouseEvent) => {
  if (isDragging && sticker.value && container.value) {
    const containerRect = container.value.getBoundingClientRect()
    const containerWidth = containerRect.width
    const containerHeight = containerRect.height

    let newX = event.clientX - startX
    let newY = event.clientY - startY

    newX = Math.max(0, Math.min(newX, containerWidth - sticker.value.width))
    newY = Math.max(0, Math.min(newY, containerHeight - sticker.value.height))

    x.value = newX
    y.value = newY

    sticker.value.style.left = `${x.value}px`
    sticker.value.style.top = `${y.value}px`
  }
}

const endDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', dragging)
  document.removeEventListener('mouseup', endDrag)
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