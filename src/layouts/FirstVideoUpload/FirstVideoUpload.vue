<template>
  <div class="container">
    <div class="first-video__wrapper">
      <UploadVideo
          @upload-file="uploadFile"
          :fileUploaded="fileUploaded"
      />
      <div class="first-video__content">
        <div v-if="!fileUploaded" class="first-video__without-video">
          <span>Загрузите видео, чтобы начать работу с сервисом</span>
          <span>Уникализация повышает шанс попасть в рекомендации, чтобы получать бесплатный органический трафик.</span>
        </div>
        <div v-else class="first-video__select-options">
          <div class="first-video__block">
            <span>Выберите параметры уникализации или оставьте их по умолчанию:</span>
            <div class="first-video__checkboxes">
              <Checkbox
                  v-for="checkbox in checkboxes"
                  :key="checkbox.id"
                  :checkbox="checkbox"
                  @change-checkbox="handleCheckboxChange(checkbox.id, $event)"
              />
            </div>
          </div>
          <div class="first-video__select-options-buttons">
            <Button
                text="Продолжить"
                color="purple"
                @click="nextVideo"
            />
            <Button
                text="Вернуться назад"
                color="white"
                @click="backUpload"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadVideo from "@/components/UploadVideo/UploadVideo.vue";
import Button from "@/components/UI/Button/Button.vue";
import Checkbox from "@/components/UI/Checkbox/Checkbox.vue";

import router from "@/router";
import { useStore } from 'vuex';
import { ref } from "vue";

const store = useStore()

const checkboxes = ref([
  { label: 'Новые метаданные', id: 0, key: 'generate_metadata',  checked: false },
  { label: 'Ускорить на 1%', id: 1, key: 'speed_percentage_up',  checked: false },
  { label: 'Наложить шумы', id: 2, key: 'add_noise',  checked: false },
  { label: 'Замедлить на 1%', id: 3, key: 'speed_percentage_down',  checked: false },
  { label: 'Наложить невидимый элемент', id: 4, key: 'invisible_object', checked: false },
  { label: 'Отразить по горизонтали', id: 5, key: 'mirror_image', checked: false },
  { label: 'Изменить насыщенность', id: 6, key: 'adjust_color', checked: false },
])

const fileUploaded = ref<File | null>(null)


const uploadFile = (file: File) => {
  fileUploaded.value = file

  const fullURL = window.location.href
  const baseURL = new URL(fullURL).origin + '/'
  const url = baseURL + encodeURIComponent(file.name)

  store.dispatch('video/uploadVideo', url)
}

const backUpload = () => {
  fileUploaded.value = null
}

const handleCheckboxChange = (id: number, isChecked: boolean) => {
  const checkbox = checkboxes.value.find(c => c.id === id)
  if (checkbox) {
    checkbox.checked = isChecked
  }
}

const nextVideo = () => {
  router.push('/second-video')
  store.dispatch('video/uploadCheckboxes', checkboxes)
}

</script>

<style scoped lang="scss">
@import "firstVideoUpload";
</style>