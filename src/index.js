import Vue from 'vue';

import axios from 'axios';
import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const base = axios.create({
    //baseURL: 'http://localhost:8092/governanca'
    baseURL: 'http://52.251.123.6:8092/governanca'
})

Vue.prototype.$http = base
Vue.use(BootstrapVue)
Vue.config.productionTip = false

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend(base);

new Vue({
    el: '#app',
    router,
    data: {
        http: base
    },
    store,
    render: h => h(App)
});
