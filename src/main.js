// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 重置样式
import './assets/css/reset.css'

// 引入vuex状态层
import store from './store/index'


// 引入公共组件
import nav from './components/index'
for (var i in nav) {
  Vue.component(i, nav[i])
}
Vue.prototype.$imgPre = "http://localhost:3000"
// 引入element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
