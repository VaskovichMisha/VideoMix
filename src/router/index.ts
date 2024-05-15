import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import FirstVideoUpload from "@/layouts/FirstVideoUpload/FirstVideoUpload.vue";
import SecondVideoUpload from "@/layouts/SecondVideoUpload/SecondVideoUpload.vue";
import SuccessUpload from "@/views/SecondVideo/SuccessUpload/SuccessUpload.vue";
import AddSticker from "@/views/SecondVideo/AddSticker/AddSticker.vue";
import AvailableDownload from "@/layouts/AvailableDownload/AvailableDownload.vue";
import SelectSecondVideo from "@/views/SecondVideo/SelectSecondVideo/SelectSecondVideo.vue";
import SuccessSticker from "@/views/SecondVideo/SuccessSticker/SuccessSticker.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/first-video'
  },
  {
    path: '/first-video',
    component: FirstVideoUpload
  },
  {
    path: '/second-video',
    component: SecondVideoUpload,

    children: [
      {
        path: '/second-video',
        component: SelectSecondVideo,
      },
      {
        path: '/second-video/success-upload',
        component: SuccessUpload,
      },
      {
        path: '/second-video/add-sticker',
        component: AddSticker,
      },
      {
        path: '/second-video/success-sticker',
        component: SuccessSticker,
      },
    ]
  },
  {
    path: '/available-download',
    component: AvailableDownload,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
