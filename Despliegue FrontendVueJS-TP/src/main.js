import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert";
import DatetimePicker from 'vuetify-datetime-picker';

Vue.config.productionTip = false
Vue.use(VueSimpleAlert);
Vue.use(DatetimePicker)

//axios.defaults.baseURL=''

axios.defaults.baseURL = 'http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api'
//axios.defaults.baseURL = 'http://localhost:4000/api/'


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
