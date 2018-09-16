import {
  fetchOrderPayResult,
  orderGoods,
  orderActivity,
  orderGroup,
  fetchGoodsOrderList,
  fetchActivityOrderList,
  fetchGoodsOrderDetail,
  fetchActivityOrderDetail,
  refundOrder,
  finishOrder,
  deleteOrder
} from '../api'

export default {
  namespaced: true,
  state: {
    orderInfo: {},
    orderResult: {},
    list: [],
    item: {},
    GET_STATUS_TEXT({ type, orderStatus, shippingStatus }) {
      return orderStatus === 8 ? '拒绝退款' : (
        type === 1 ? ( // 商品
          orderStatus === 1 ? '待付款' :
            orderStatus === 2 ? '已付款' :
              orderStatus === 3 ? '退款中' :
                orderStatus === 4 ? '已退款' :
                  orderStatus === 5 ? '已完成' :
                    orderStatus === 6 ? '已发货' :
                      orderStatus === 7 ? '退款已过期' :
                        '-'
        ) : ( // 活动
          orderStatus === 3 ? '退款中' :
            orderStatus === 7 ? '退款已过期' :
              shippingStatus === 1 ? '待消费' :
                shippingStatus === 2 ? '消费中' :
                  shippingStatus === 3 ? '已消费' :
                    shippingStatus === 4 ? '退款' :
                      shippingStatus === 5 ? '已完成' :
                        shippingStatus === 6 ? '待付款' :
                          '-'
        )
      )
    }
  },
  mutations: {
    UPDATE_ORDER_INFO(state, payload) {
      state.orderInfo = {
        ...state.orderInfo,
        ...payload
      }
    },
    SET_ORDER_RESULT(state, payload) {
      state.orderResult = payload
    },
    SET_LIST(state, payload) {
      state.list = payload
    },
    SET_ITEM(state, payload) {
      state.item = payload
    }
  },
  actions: {
    ORDER_GOODS({ commit }, payload) {
      return orderGoods(payload).then(data => {
        commit('SET_ORDER_RESULT', data)
        return data
      })
    },
    ORDER_ACTIVITY({ commit }, payload) {
      return orderActivity(payload).then(data => {
        commit('SET_ORDER_RESULT', data)
        return data
      })
    },
    ORDER_GROUP({ commit }, payload) {
      return orderGroup(payload).then(data => {
        commit('SET_ORDER_RESULT', data)
        return data
      })
    },
    FETCH_PAY_RESULT(_, payload) {
      return fetchOrderPayResult(payload)
    },
    FETCH_LIST({ commit }, { id, ...restArgs }) {
      return (
        +id === 1 ? fetchGoodsOrderList : fetchActivityOrderList
      )(restArgs).then(data => {
        commit('SET_LIST', data)
      })
    },
    FETCH_ITEM({ commit }, { type, ...restArgs }) {
      return (
        +type === 1 ? fetchGoodsOrderDetail : fetchActivityOrderDetail
      )(restArgs).then(data => {
        commit('SET_ITEM', data)
      })
    },
    REFUND(_, payload) {
      return refundOrder(payload)
    },
    FINISH(_, payload) {
      return finishOrder(payload)
    },
    DELETE(_, payload) {
      return deleteOrder(payload)
    }
  }
}
