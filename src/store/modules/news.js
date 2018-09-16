import {
  fetchNewsCategoryList,
  fetchNewsList,
  fetchNewsDetail,
  fetchNewsCommentList,
  commentNews,
  orderNews,
  likeNews
} from '../api'

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 15,
    noMore: false,
    categoryList: [],
    activeCategory: {},
    list: [],
    item: {},
    commentList: []
  },
  mutations: {
    SET_COMMENT_LIST(state, payload) {
      state.commentList = payload
    },
    SET_CATEGORY_LIST(state, payload) {
      state.categoryList = payload
    },
    SET_ACTIVE_CATEGORY(state, payload) {
      state.activeCategory = payload
    },
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
    FETCH_COMMENT_LIST({ commit }, { id }) {
      return fetchNewsCommentList({ limit: 50, page: 1, id }).then(({ data }) => {
        commit('SET_COMMENT_LIST', data)
      })
    },
    FETCH_CATEGORY_LIST({ commit }) {
      return fetchNewsCategoryList().then(data => {
        commit('SET_CATEGORY_LIST', data)
      })
    },
    FETCH_LIST({ commit, state }, { refresh = false } = {}) {
      if (refresh) {
        commit('SET_PAGE', 1)
        commit('TOGGLE_NO_MORE', false)
      }
      const { page, limit, activeCategory } = state
      return fetchNewsList({ page, limit, category: activeCategory.name }).then(data => {
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
      return fetchNewsDetail(payload).then(data => {
        commit('SET_ITEM', data)
      })
    },
    REWARD(_, payload) {
      return orderNews(payload)
    },
    LIKE(_, payload) {
      return likeNews(payload)
    },
    COMMENT(_, payload) {
      return commentNews(payload)
    }
  }
}

