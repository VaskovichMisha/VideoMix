<template>
  <div class="available-download">
    <span class="available-download__title">Обработка завершена, видео доступно для скачивания </span>
    <div class="available-download__link">
      <span>Поделиться: </span>
      <a href="#">https://dream-14.online/app/videomix/project22</a>
    </div>
    <div class="available-download__block">
      <div class="available-download__buttons">
        <Button
            text="Скачать"
            color="purple"
        />
        <Button
            text="Сгенерировать копию"
            color="white"
        />
        <button class="available-download__button">
          Загрузить новое видео
        </button>
      </div>
      <span>* Ссылка на скачивание доступна 24 часа после генерации.</span>
      <div class="available-download__copies">
        <div class="available-download__copy">
          <span>Копия 1</span>
          <span>|</span>
          <button>Скачать</button>
        </div>
        <div class="available-download__copy">
          <span>Копия 2</span>
          <span>|</span>
          <button>Скачать</button>
        </div>
        <div class="available-download__copy">
          <span>Копия 3</span>
          <span>|</span>
          <button>Скачать</button>
        </div>
        <div class="available-download__copy">
          <span>Копия 4</span>
          <span>|</span>
          <Loader width="24" />
          <span> Идет обработка... Процесс генерации может занять несколько минут.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "@/components/UI/Button/Button.vue";
import Loader from "@/components/UI/loader/loader.vue";
</script>

<style scoped lang="scss">
@import "availableDownload";
</style>