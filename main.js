import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

Vue.mixin({
  created() {
    // 绑定this方便调试
    if (typeof parent !== 'undefined' && this.mpType === 'page') {
      parent.$vm0 = this
    }
  }
})
