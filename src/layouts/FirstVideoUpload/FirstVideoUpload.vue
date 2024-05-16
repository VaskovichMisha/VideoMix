<template>
  <div class="container">
    <div class="first-video__wrapper">
      <UploadVideo
          @upload-file="uploadFile"
          :fileUploaded="fileUploaded"
          :loadingFiles="loadingVideoOne"
      />
      <div class="first-video__content">
        <div v-if="!fileUploaded" class="first-video__without-video">
          <span>Загрузите видео, чтобы начать работу с сервисом</span>
          <span>Уникализация повышает шанс попасть в рекомендации, чтобы получать бесплатный органический трафик.</span>
        </div>
        <div v-else-if="loadingVideoOne" class="first-video__without-video">
          <span>Подождите, пока загрузится видео</span>
        </div>
        <div v-else class="first-video__select-options">
          <div class="first-video__block">
            <span>Выберите параметры уникализации или оставьте их по умолчанию:</span>
            <div class="first-video__checkboxes">
              <Checkbox
                  v-for="checkbox in checkboxes"
                  :key="checkbox.id"
                  :checkbox="checkbox"
                  :is-hint-visible="visibleHintId === checkbox.id"
                  @change-checkbox="handleCheckboxChange(checkbox.id, $event)"
                  @toggle-hint="toggleHint(checkbox.id)"
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
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

const store = useStore()

const checkboxes = ref([
  { label: 'Новые метаданные', id: 0, key: 'generate_metadata', checked: false, textHint: 'Использование новых метаданных увеличивает уникальность видео и шансы на успешное прохождение через системы модерации дублирующего контента на видеоплощадках.' },
  { label: 'Ускорить на 1%', id: 1, key: 'speed_percentage_up', checked: false, textHint: 'Небольшое ускорение может изменить временные характеристики видео, помогая ему обходить автоматические системы проверки на совпадение содержания. Это эффективный способ сделать видео уникальным без заметных визуальных изменений.' },
  { label: 'Наложить шумы', id: 2, key: 'add_noise',  checked: false, textHint: 'Добавление шума в видео изменяет его визуальные характеристики, что может помочь пройти через автоматические системы модерации, обнаруживающие повторяющийся контент.' },
  { label: 'Замедлить на 1%', id: 3, key: 'speed_percentage_down', checked: false, textHint: 'Незначительное замедление видео на 1% изменяет его продолжительность и может помочь избежать автоматического распознавания дублирующего контента системами модерации.' },
  { label: 'Наложить невидимый элемент', id: 4, key: 'invisible_object', checked: false, textHint: 'Невидимый элемент поможет добавить уникальности без изменения визуальной части видео.' },
  { label: 'Отразить по горизонтали', id: 5, key: 'mirror_image', checked: false, textHint: 'Отражение видео изменяет его ориентацию, что может быть полезно для обхода автоматических проверок на сходство с уже известными видео. Если в вашем видео присутствует текст, он также будет отражён и может стать нечитаемым.' },
  { label: 'Изменить насыщенность', id: 6, key: 'adjust_color', checked: false, textHint: 'Изменение насыщенности может существенно отличать ваше видео от оригинала, что помогает обойти системы идентификации дубликатов.' },
])

const fileUploaded = ref<File | null>(null)

const loadingVideoOne = ref(false)

watch(() => store.state.video.loadingFiles.video1_url, (newValue) => {
  loadingVideoOne.value = newValue
})

const uploadFile = (file: File) => {
  fileUploaded.value = file
  store.dispatch('video/downloadFile', { file: file, type: 'video', key: 'video1_url' })
  loadingVideoOne.value = true
}

const backUpload = () => {
  fileUploaded.value = null
  store.commit('video/CLEAR_LOADING_FILES', 'video1_url')
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

const visibleHintId = ref<number | null>(null)

const toggleHint = (id: number) => {
  visibleHintId.value = visibleHintId.value === id ? null : id
}

const handleClickOutside = (event: Event) => {
  if (!(event.target as HTMLElement).closest('.checkbox')) {
    visibleHintId.value = null
  }
}

onMounted(() => {
  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>

<style scoped lang="scss">
@import "firstVideoUpload";
</style>