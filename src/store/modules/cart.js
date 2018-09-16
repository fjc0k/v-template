import {
  fetchCartList,
  addGoodsToCart,
  deleteGoodsFromCart,
  clearCart
} from '../api'

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0
  },
  getters: {
    count(state) {
      return state.items.length
    }
  },
  mutations: {
    SET_ITEMS(state, payload) {
      state.items = payload
    },
    SET_COUNT(state, payload) {
      state.count = payload
    },
    DELETE_ITEM(state, payload) {
      state.items.splice(
        state.items.indexOf(payload.item),
        1
      )
    }
  },
  actions: {
    FETCH_ITEMS({ commit }) {
      return fetchCartList().then(data => {
        commit('SET_ITEMS', data)
        commit('SET_COUNT', data.length)
        return data
      })
    },
    ADD({ state, commit }, payload) {
      return addGoodsToCart(payload).then(() => {
        commit('SET_COUNT', state.count + 1)
      })
    },
    DELETE({ state, commit }, payload) {
      return deleteGoodsFromCart(payload).then(() => {
        commit('SET_COUNT', state.count - 1)
        commit('DELETE_ITEM', payload)
      })
    },
    CLEAR({ commit }) {
      return clearCart().then(() => {
        commit('SET_COUNT', 0)
      })
    }
  }
}
