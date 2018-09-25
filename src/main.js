require('promise.prototype.finally').shim() // 必须手动支持 finally
import Vue from 'vue'
import Lopo from 'lopo'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as components from '@components'
import 'amfe-flexible'
import './styles/lopo.css'

Vue.use(Lopo)

sync(store, router)

Object.keys(components).forEach(componentName => {
  Vue.component(
    components[componentName].name || componentName,
    components[componentName]
  )
})

Vue.prototype.$goto = (name, params) => router.push({ name, params })

Vue.prototype.$wepay = (api, skip = false) => {
  return skip ? Promise.resolve() : new Promise((resolve, reject) => {
    function onBridgeReady() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        typeof api === 'string' ? JSON.parse(api) : api,
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            resolve()
          } else {
            reject()
          }
        }
      )
    }
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
    }
  })
}

Vue.mixin({
  data: () => ({
    asyncDataOk$$: false
  }),
  beforeCreate() {
    document.title = (this.$route && this.$route.meta.title) || '移动校园'
    const { asyncData, render } = this.$options
    if (asyncData) {
      this.$options.render = function (h) {
        return this.asyncDataOk$$ ? render.call(this, h) : null
      }
      this.$loading('加载中...').then(loading => {
        asyncData.call(this, {
          store: this.$store,
          route: this.$route
        }).then(() => {
          this.asyncDataOk$$ = true
          loading.hide()
        }).catch(() => {
          this.asyncDataOk$$ = false
          loading.hide()
          this.$alert({
            title: '出错啦!',
            message: '数据加载失败~'
          }, {
            on: {
              confirm: () => {
                this.$router.back()
              }
            }
          })
        })
      })
    }
  }
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')
