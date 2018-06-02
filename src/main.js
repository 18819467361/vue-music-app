// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueTouch from 'vue-touch'
import VueLazyLoad from 'vue-lazyload'
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueLazyLoad, {
  loading: require('./assets/lazyload.jpg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
