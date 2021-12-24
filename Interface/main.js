
// if (self == top) {
// 	if (navigator.userAgent.indexOf('Mobile')<0) {
// 		if(window.location.href.indexOf("redirect.html") < 0){
// 			// window.location.replace("file:///E:/NFTShop/Interface/redirect.html");
// 			window.location.href = "redirect.html";
// 		}
// 	}
// }
	
// #ifndef VUE3
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// window.onbeforeunload = function(event){
// 	console.log("window onbeforeunload");
// };

// window.onload = function(event){
// 	console.log("window onload");
// };

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif