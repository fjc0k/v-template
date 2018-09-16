import { fetchBannerList } from '../api'

export default {
  namespaced: true,
  state: {
    bannerList: [],
    serviceVisible: false,
    serviceTel: '18608537776',
    freight: 0 // 快递费
  },
  mutations: {
    SET_BANNER_LIST(state, payload) {
      state.bannerList = payload
    },
    SET_SERVICE_VISIBLE(state, payload) {
      state.serviceVisible = payload
    }
  },
  actions: {
    FETCH_BANNER_LIST({ commit }) {
      return fetchBannerList().then(data => {
        commit('SET_BANNER_LIST', data)
      })
    }
  }
}
