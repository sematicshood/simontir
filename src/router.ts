import Vue from 'vue';
import Router from 'vue-router';
import auth from './helpers/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: () => import('@views/404'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@views/Login'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@views/Register'),
      meta: {
        requiresAuth: true,
        role: ['front desk'],
      },
    },
    {
      path: '/final_check/:id',
      name: 'final_check',
      component: () => import('@views/FinalCheck'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik', 'asisten mekanik'],
      },
    },
    {
      path: '/list_final_check',
      name: 'list_final_check',
      component: () => import('@views/ListFinalCheck'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik', 'asisten mekanik'],
      },
    },
    {
      path: '/list_mekanik',
      name: 'list_mekanik',
      component: () => import('@views/ListMekanik'),
      meta: {
        requiresAuth: true,
        role: ['mekanik'],
      },
    },
    {
      path: '/option_role',
      name: 'option_role',
      component: () => import('@views/OptionRole'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik'],
      },
    },
    {
      path: '/timesheet_mekanik/:id',
      name: 'timesheet_mekanik',
      component: () => import('@views/TimesheetMekanik'),
      meta: {
        requiresAuth: true,
        role: ['mekanik'],
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  let login: Array<string> = JSON.parse(localStorage.getItem('login'))

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(login) {
      if(login.role != 'manager') {
        if(to.meta.role.includes(login.role) == false) next({ name: auth.cekRoleUrl(login.role) })
      }
    } else {
      next({ name: 'login' })
    }
  }

  next()
});

export default router;
