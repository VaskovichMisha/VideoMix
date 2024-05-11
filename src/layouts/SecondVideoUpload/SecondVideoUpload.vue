<template>
  <div class="container">
    <div class="second-video__wrapper">
      <UploadVideo
          @upload-file="uploadFile"
          :fileUploaded="fileUploaded"
          :urlSticker="urlSticker"
      />
      <RouterView
          @back-upload="backUpload"
          @upload-sticker="uploadSticker"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadVideo from "@/components/UploadVideo/UploadVideo.vue";

import router from "@/router";
import { onMounted, ref, Ref } from "vue";

import { useStore } from 'vuex'
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

const uploadFile = (file: File) => {
  fileUploaded.value = file
  router.push('/second-video/success-upload')

  const fullURL = window.location.href
  const baseURL = new URL(fullURL).origin + '/'
  const url = baseURL + encodeURIComponent(file.name)

  dataVideoProcessing.value.video2_url = url
  console.log(dataVideoProcessing.value)
}

const backUpload = () => {
  fileUploaded.value = null
}

const uploadSticker = (file: File) => {
  urlSticker.value = URL.createObjectURL(file)
  console.log(urlSticker.value)
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
  dataVideoProcessing.value.video1_url = store.state.video.uploadedVideo
  handleCheckboxChange()
})
</script>

<style scoped lang="scss">
@import "secondVideoUpload";
</style>