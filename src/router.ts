import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: () => import('./views/404'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register'),
    },
    {
      path: '/final_check/:id',
      name: 'final_check',
      component: () => import('./views/FinalCheck'),
    },
    {
      path: '/list_final_check',
      name: 'list_final_check',
      component: () => import('./views/ListFinalCheck'),
    },
    {
      path: '/list_mekanik',
      name: 'list_mekanik',
      component: () => import('./views/ListMekanik'),
    },
    {
      path: '/option_role',
      name: 'option_role',
      component: () => import('./views/OptionRole'),
    },
    {
      path: '/timesheet_mekanik/:id',
      name: 'timesheet_mekanik',
      component: () => import('./views/TimesheetMekanik'),
    },
  ],
});
