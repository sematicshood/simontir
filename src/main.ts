import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import 'v-autocomplete/dist/v-autocomplete.css';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './modules';
import './registerServiceWorker';

const CSV = require('vue-json-csv');
const { JsonCSV } = CSV;

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.component('downloadCsv', JsonCSV);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
