import {
  fetchGroupList,
  fetchGroupDetail
} from '../api'

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 15,
    noMore: false,
    list: [],
    item: {}
  },
  mutations: {
    SET_LIST(state, payload) {
      state.list = payload
    },
    APPEND_LIST(state, payload) {
      state.list = [
        ...state.list,
        ...payload
      ]
    },
    SET_ITEM(state, payload) {
      state.item = payload
    },
    TOGGLE_NO_MORE(state, payload = !state.noMore) {
      state.noMore = payload
    },
    SET_PAGE(state, newPage) {
      state.page = newPage
    }
  },
  actions: {
    FETCH_LIST({ commit, state }, { refresh = false } = {}) {
      if (refresh) {
        commit('SET_PAGE', 1)
        commit('TOGGLE_NO_MORE', false)
      }
      const { page, limit } = state
      return fetchGroupList({ page, limit }).then(({ data }) => {
        if (!data || data.length === 0) {
          if (page === 1) {
            commit('SET_LIST', [])
          }
          commit('TOGGLE_NO_MORE', true)
        } else {
          if (page === 1) {
            commit('SET_LIST', data)
          } else {
            commit('APPEND_LIST', data)
          }
          commit('SET_PAGE', page + 1)
        }
      })
    },
    FETCH_ITEM({ commit }, payload) {
      return fetchGroupDetail(payload).then(data => {
        commit('SET_ITEM', data)
      })
    }
  }
}
