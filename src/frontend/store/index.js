import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isOpen: false
    },
    mutations: {
        setPortStatus(state, data) {
            state.isOpen = data;
        }
    },
    actions: {
    },
    modules: {
    }
});
