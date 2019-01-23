import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import sales from './sales'
import crm from './crm'
import customer from './customer'
import employee from './employee'
import fleet from './fleet'
import inventory from './inventory'
import invoice from './invoice'
import project from './project'
import timesheet from './timesheet'

const store = new Vuex.Store({
    modules: {
        sales,
        crm,
        customer,
        employee,
        fleet,
        inventory,
        invoice,
        project,
        timesheet,
    }
});

export default store;
