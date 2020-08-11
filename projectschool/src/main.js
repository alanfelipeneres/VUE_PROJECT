import Vue from 'vue'
import App from './App.vue'
//VueResource é utilizado para fazer as requisições a API
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource);

new Vue({
  render: h => h(App),
}).$mount('#app')
