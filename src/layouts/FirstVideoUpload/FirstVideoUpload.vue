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
                  :checkbox="checkbox"
              />
            </div>
          </div>
          <div class="first-video__select-options-buttons">
            <Button
                text="Продолжить"
                color="purple"
                @click="$router.push('/second-video')"
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
import { ref } from "vue";

const checkboxes = ref([
  { label: 'Новые метаданные', id: 0 },
  { label: 'Ускорить на 1%', id: 1 },
  { label: 'Наложить шумы', id: 2 },
  { label: 'Замедлить на 1%', id: 3 },
  { label: 'Наложить невидимый элемент ', id: 4 },
  { label: 'Отразить по горизонтали', id: 5 },
  { label: 'Изменить насыщенность', id: 6 },
])

const fileUploaded = ref<File | null>(null)

const uploadFile = (file: File) => {
  fileUploaded.value = file
}

const backUpload = () => {
  fileUploaded.value = null
}

</script>

<style scoped lang="scss">
@import "firstVideoUpload";
</style>