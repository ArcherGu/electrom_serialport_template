import Vue from 'vue';
import App from './frontend/App.vue';
import router from './frontend/router';
import store from './frontend/store';
import './frontend/plugins/element.js';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
