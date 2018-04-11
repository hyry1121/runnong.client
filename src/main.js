import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


if( !String.prototype.trim ) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  }
}

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
