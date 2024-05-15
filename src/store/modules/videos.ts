import * as API from '@/api/index'
import { Commit } from "vuex";

export default {
  namespaced: true,
  state: {
    uploadCheckboxes: null as Array<any> | null,
    stateVideoProcessing: {
      video1_url: '',
      video2_url: '',
      image_url: '',
    },
    loadingFiles: {
      video1_url: null,
      video2_url: null,
      image_url: null,
    },
    intervalId: null,
    taskInfo: '',
    taskId: '',
    urlDownloadVideo: ''
  },
  actions: {
    downloadFile({ commit, state }: { commit: Commit, state: any }, { file, type, key }: { file: any, type: string, key: String }) {
      API.downloadFile(file, type).then(response => {
        if(response) {
          commit('SET_VIDEO_URL', { key, url: response.data.url })
        }
      })
    },
    videoProcessing({ commit, dispatch, state }: { commit: Commit, dispatch: any, state: any }, data: Object) {
      API.videoProcessing(data).then(response => {
        if(response) {
          state.taskId = response.data.task_id

          const intervalId = setInterval(() => {
            dispatch('getInfoTask', state.taskId);
          }, 5000)

          commit('SET_INTERVAL_ID', intervalId)
        }
      })
    },
    getInfoTask({commit, state}: { commit: Commit, state: any }, id: String) {
      API.getInfoTask(id).then(response => {
        if(state.urlDownloadVideo) {
          
        } else {
          if(response) {
            state.taskInfo = response.data.info
          }

          if(response.data.url) {
            state.urlDownloadVideo = response.data.url
            commit('CLEAR_INTERVAL')
          }
        }
      })
    },
    uploadCheckboxes({ commit }: { commit: Commit }, checkboxes: Array<any>) {
      commit('SET_UPLOAD_CHECKBOXES', checkboxes)
    },
  },
  mutations: {
    SET_UPLOAD_CHECKBOXES(state: any, checkboxes: Array<any> | null) {
      state.uploadCheckboxes = checkboxes
    },
    SET_VIDEO_URL(state: any, { key, url }: { key: string, url: string }) {
      if (state.stateVideoProcessing.hasOwnProperty(key)) {
        state.stateVideoProcessing[key] = url
        state.loadingFiles[key] = false
        console.log(state.loadingFiles)
      }
    },
    CLEAR_LOADING_FILES(state: any, key: string) {
      state.loadingFiles[key] = null
      console.log(state.loadingFiles)
    },
    SET_INTERVAL_ID(state: any, intervalId: number) {
      state.intervalId = intervalId
    },
    CLEAR_INTERVAL(state: any) {
      clearInterval(state.intervalId)
      state.intervalId = null
    },
  }
}
