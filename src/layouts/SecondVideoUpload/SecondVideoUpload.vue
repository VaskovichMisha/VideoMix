<template>
  <div class="container">
    <div class="second-video__wrapper">
      <UploadVideo
          @upload-file="uploadFile"
          :fileUploaded="fileUploaded"
          :urlSticker="urlSticker"
          :loadingFiles="loadingVideoTwo"
      />
      <div v-if="loadingVideoTwo" class="second-video__load">
        <span>Подождите, пока загрузится второе видео</span>

      </div>
      <RouterView
          v-if="!loadingVideoTwo"
          @back-upload="backUpload"
          @success-upload="successUpload"
          @upload-sticker="uploadSticker"
          @skip-add-sticker="skipAddSticker"
          @back-sticker="backSticker"
          @start-processing="startProcessing"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadVideo from "@/components/UploadVideo/UploadVideo.vue";

import router from "@/router";
import { onMounted, ref, watch } from "vue";

import { useStore } from 'vuex'
import checkbox from "@/components/UI/Checkbox/Checkbox.vue";
import TextHints from "@/components/UI/TextHints/TextHints.vue";

const store = useStore()

const fileUploaded = ref<File | null>(null)
const urlSticker = ref<String | null>(null)

const dataVideoProcessing = ref({
  video1_url: '',
  video2_url: '',
  image_url: '',
  speed_percentage: 100,
  add_noise: false,
  adjust_color: false,
  mirror_image: false,
  generate_metadata: false,
  invisible_object: false
})

const loadingVideoTwo = ref(false)

watch(() => store.state.video.loadingFiles.video2_url, (newValue) => {
  loadingVideoTwo.value = newValue
})

const uploadFile = (file: File) => {
  fileUploaded.value = file
  router.push('/second-video/success-upload')
  store.dispatch('video/downloadFile', { file: file, type: 'video', key: 'video2_url' })

  loadingVideoTwo.value = true
}

const backUpload = () => {
  fileUploaded.value = null
}

const successUpload = () => {
  dataVideoProcessing.value.video2_url = store.state.video.stateVideoProcessing.video2_url
}

const uploadSticker = (file: File) => {
  router.push('/second-video/success-sticker')
  urlSticker.value = URL.createObjectURL(file)
  store.dispatch('video/downloadFile', { file: file, type: 'sticker', key: 'image_url' })
}

const skipAddSticker = () => {
  dataVideoProcessing.value.video2_url = store.state.video.stateVideoProcessing.video2_url
  store.dispatch("video/videoProcessing", dataVideoProcessing.value)
}

const startProcessing = () => {
  store.dispatch("video/videoProcessing", dataVideoProcessing.value)
}

const backSticker = () => {
  dataVideoProcessing.value.image_url = ''
  urlSticker.value = null
}

const generateCopy = () => {
  console.log(111)
  if (store.state.video.uploadCheckboxes.some((checkbox: any) => checkbox.checked)) {
    store.dispatch("video/videoProcessing", dataVideoProcessing.value)
  }
}

const handleCheckboxChange = () => {
  const uploadCheckboxes = store.state.video.uploadCheckboxes
  if (Array.isArray(uploadCheckboxes)) {
    const speedUpCheckbox = uploadCheckboxes.find(checkbox => checkbox.key === 'speed_percentage_up')
    const speedDownCheckbox = uploadCheckboxes.find(checkbox => checkbox.key === 'speed_percentage_down')

    if (speedUpCheckbox && speedUpCheckbox.checked && speedDownCheckbox && speedDownCheckbox.checked) {
     dataVideoProcessing.value.speed_percentage = 100
    } else {
      if (speedUpCheckbox && speedUpCheckbox.checked) {
        dataVideoProcessing.value.speed_percentage = 101
      } else if (speedDownCheckbox && speedDownCheckbox.checked) {
        dataVideoProcessing.value.speed_percentage = 99
      }
    }

    uploadCheckboxes.forEach(checkbox => {
      if (checkbox.key !== 'speed_percentage_up' && checkbox.key !== 'speed_percentage_down') {
        dataVideoProcessing.value[checkbox.key] = checkbox.checked
      }
    })
  }
}

onMounted(() => {
  dataVideoProcessing.value.video1_url = store.state.video.stateVideoProcessing.video1_url
  console.log(dataVideoProcessing.value)
  handleCheckboxChange()
})
</script>

<style scoped lang="scss">
@import "secondVideoUpload";
</style>