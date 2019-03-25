// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import './common/stylus/index.styl'

//fastclick推荐用法：使document.body下面所有的点击都没有300ms的延迟
 fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('@/common/image/default.png')
})

/* eslint-disable no-unused-vars */
/* 生产环境记得注释掉*/
import VConsole from 'vconsole'
var vConsole = new VConsole()
console.log('VConsole is cool')


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
