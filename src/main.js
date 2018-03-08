// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import home from './components/home/home';
import list from './components/list/list';
import global_ from './global';
// eslint-disable-next-line
/* eslint-disable */

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.prototype.GLOBAL = global_;

var routes = [
  {path: '/home', component: home},
  {path: '/goods', component: goods},
  {path: '/list', component: list}
];
var router = new VueRouter({
  linkActiveClass: 'active',
  routes
});
new Vue({
  el:'#app',
  template: '<App/>',
  components: {App},
  router
});

router.push('/home');
