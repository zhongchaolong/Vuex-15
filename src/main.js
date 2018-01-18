//1.1 导入vue包
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//1.2导入与vue物管的第三方包
import 'normalize.css'
import axios from 'axios'
// import './less/index.less'

//2 导入自己写的模块
//路由实例
import router from './router'
//跟组件
import App from './App'
//接口配置
import api from './js/api-config.js'

//3.1 统一use启动vue插件
Vue.use(Vuex)
Vue.use(ElementUI)

// 3.2 统一添加配置
axios.defaults.baseURL = 'http://localhost:8899'
// 一配置, 以后所有的请求就会自动使用这个域名
axios.defaults.withCredentials = true

// 一配置, 以后所有的请求就会自动使用这个域名
Vue.prototype.$http = axios
// 加到原型, 方便组件使用
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
