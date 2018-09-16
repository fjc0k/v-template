import {
  commentGoodsByOrder,
  fetchGoodsCommentList
} from '../api'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    SET_LIST(state, payload) {
      state.list = payload
    }
  },
  actions: {
    FETCH_LIST({ commit }, { type, ...restArgs }) {
      return (
        type === 1 ? fetchGoodsCommentList :
          Promise.resolve
      )(restArgs).then(data => {
        commit('SET_LIST', data)
      })
    },
    ADD(_, { type, ...restArgs }) {
      return (
        type === 1 ? commentGoodsByOrder :
          Promise.resolve
      )(restArgs)
    }
  }
}
