import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import {web} from './web';

const store = new Vuex.Store({
    modules: {
        web,
    },
});

export default store;
