import { findIndex } from 'lodash'

export default {
  namespaced: true,
  state: {
    activeIndex: 0
  },
  mutations: {
    SET_ACTIVE_INDEX(state, payload) {
      state.activeIndex = payload
    }
  },
  getters: {
    items(state, getters, rootState) {
      return [
        {
          _icon: 'home',
          _activeIcon: 'home',
          title: '首页',
          to: { name: 'goodsList' }
        },
        {
          _icon: 'cart',
          _activeIcon: 'cart',
          title: '购物车',
          to: { name: 'cart' },
          info: rootState.cart.count || null
        },
        {
          _icon: 'profile',
          _activeIcon: 'profile',
          title: '我的',
          to: { name: 'userHome' }
        }
      ]
    },
    defaultActiveIndex(state, getters, rootState) {
      return findIndex(
        getters.items,
        item => item.to.name === rootState.route.name
      )
    }
  }
}
