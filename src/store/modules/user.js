import { fetchUserInfo, fetchAddress } from '../api'

export default {
  namespaced: true,
  state: {
    info: null,
    address: {}
  },
  mutations: {
    SET_INFO(state, payload) {
      state.info = payload
    },
    SET_ADDRESS(state, payload) {
      state.address = payload
    }
  },
  actions: {
    FETCH_INFO({ state, commit }) {
      return state.info ? Promise.resolve() : fetchUserInfo().then(data => {
        commit('SET_INFO', data)
      })
    },
    FETCH_ADDRESS({ commit }) {
      return fetchAddress().then(data => {
        data = data || {}
        commit('SET_ADDRESS', {
          address: data.cgn_address || '',
          phone: data.cgn_tel || '',
          name: data.cgn_name || ''
        })
      })
    }
  }
}
