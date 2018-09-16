import { find, castArray } from 'lodash'
import dayjs from 'dayjs'
import { fetchGoodsList, fetchGoodsDetail } from '../api'

const processGoods = goods => {
  return castArray(goods).map(item => {
    if (+item.is_seckill === 1) {
      const now = dayjs()
      const seckill = find(item.seckill, seckillItem => {
        return dayjs(seckillItem.start_time).isBefore(now) && dayjs(seckillItem.end_time).isAfter(now)
      })
      if (seckill) {
        item.isSeckill = true
        item.seckillInfo = {
          startTime: seckill.start_time,
          endTime: seckill.end_time,
          price: +seckill.kill_price,
          originalPrice: +item.goods_high_price
        }
      }
    }
    return item
  })
}

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 20,
    noMore: false,
    list: [],
    item: {}
  },
  mutations: {
    SET_LIST(state, payload) {
      state.list = processGoods(payload)
    },
    APPEND_LIST(state, payload) {
      state.list = [
        ...state.list,
        ...processGoods(payload)
      ]
    },
    SET_ITEM(state, payload) {
      state.item = processGoods(payload)[0]
    },
    TOGGLE_NO_MORE(state, payload = !state.noMore) {
      state.noMore = payload
    },
    SET_PAGE(state, newPage) {
      state.page = newPage
    }
  },
  actions: {
    FETCH_LIST({ commit, state }, { keyword = '', refresh = false } = {}) {
      if (refresh) {
        commit('SET_PAGE', 1)
        commit('TOGGLE_NO_MORE', false)
      }
      const { page, limit } = state
      return fetchGoodsList({ keyword, page, limit }).then(({ data }) => {
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
      return fetchGoodsDetail(payload).then(data => {
        commit('SET_ITEM', data)
      })
    }
  }
}
