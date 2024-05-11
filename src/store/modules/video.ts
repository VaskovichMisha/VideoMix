import * as API from '@/api/index'
import { Commit } from "vuex";

export default {
  namespaced: true,
  state: {
    uploadedVideo: null as String | null,
    uploadCheckboxes: null as Array<any> | null,
  },
  actions: {
    videoProcessing({commit}: { commit: Commit }, data: Object) {
      API.videoProcessing(data).then(response => {

      })
    },
    uploadVideo({commit}: { commit: Commit }, url: String) {
      commit('SET_UPLOAD_VIDEO', url)
    },
    uploadCheckboxes({commit}: { commit: Commit }, checkboxes: Array<any>) {
      commit('SET_UPLOAD_CHECKBOXES', checkboxes)
    },
  },
  mutations: {
    SET_UPLOAD_VIDEO(state: any, url: string | null) {
      state.uploadedVideo = url
    },
    SET_UPLOAD_CHECKBOXES(state: any, checkboxes: Array<any> | null) {
      state.uploadCheckboxes = checkboxes
      console.log(state.uploadCheckboxes)
    }
  }
}