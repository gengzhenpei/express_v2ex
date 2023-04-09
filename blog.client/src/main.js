
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
import './static/css/base.css'
import VueLazyLoad from 'vue-lazyload'
import { money } from './filter/moneyFilter.js'
import mixins from '@/utils/mixins.js'
import store from './store/store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.mixin(mixins)

Vue.use(iView)
/*自定义全局金额自动分割指令*/
Vue.directive("money", {
	inserted: function (el, v) {
		console.log(el)
		el.innerHTML = money(el.innerHTML)
	}
});


Vue.use(VueLazyLoad, {
	preLoad: 1.3,
	error: require('./static/img/do_logo.png'),
	loading: require('./static/img/do_logo.png')
})
Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	render: h => h(App),
	store,
})