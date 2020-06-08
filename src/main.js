// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'//自动添加新的api
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/rem.js'
import './assets/scss/index.scss'
import 'swiper/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'//解决移动端事件300ms延迟
fastclick.attach(document.body);

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  preLoad: 1,
  error: require('@/assets/img/error.png'),
  loading: require('@/assets/img/loading.gif'),
  attempt: 1
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
