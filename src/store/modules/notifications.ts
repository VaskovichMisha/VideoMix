import * as API from '@/api/index'
import { Commit } from "vuex";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    error: null
  },
  actions: {

  },
  mutations: {
    ERROR_CHANGE(state: any, error: string) {
      state.error = error
    },
    CLEAR_ERROR(state: any) {
      state.error = null
    }
  }
}