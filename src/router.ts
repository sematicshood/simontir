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
      meta: {
        title: 'Login',
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@views/Register'),
      meta: {
        requiresAuth: true,
        role: ['front desk'],
        title: 'Register',
        show: true,
      },
    },
    {
      path: '/final_check/:id',
      name: 'final_check',
      component: () => import('@views/FinalCheck'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik', 'asisten mekanik'],
        title: 'Final Check',
      },
    },
    {
      path: '/list_final_check',
      name: 'list_final_check',
      component: () => import('@views/ListFinalCheck'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik', 'asisten mekanik'],
        title: 'List Final Check',
        show: true,
      },
    },
    {
      path: '/list_mekanik',
      name: 'list_mekanik',
      component: () => import('@views/ListMekanik'),
      meta: {
        requiresAuth: true,
        role: ['mekanik'],
        title: 'List Mekanik',
        show: true,
      },
    },
    {
      path: '/option_role',
      name: 'option_role',
      component: () => import('@views/OptionRole'),
      meta: {
        requiresAuth: true,
        role: ['kepala mekanik'],
        title: 'Option Role',
        show: true,
      },
    },
    {
      path: '/timesheet_mekanik/:id',
      name: 'timesheet_mekanik',
      component: () => import('@views/TimesheetMekanik'),
      meta: {
        requiresAuth: true,
        role: ['mekanik'],
        title: 'Timesheet Mekanik',
      },
    },
    {
      path: '/queue_board',
      name: 'queue_board',
      component: () => import('@views/QueueBoard'),
      meta: {
        title: 'Queue Board'
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  let login: Array<string> = JSON.parse(localStorage.getItem('login'))

  document.title = 'Simontir - ' + to.meta.title

  if(to.name == 'login' && login) {
    next({ name: auth.cekRoleUrl(login.role) })
  }

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(login) {
      if(login.role.toUpperCase() != 'manager'.toUpperCase()) {
        let role  = to.meta.role.map(function(x){ return x.toUpperCase() }),
            lrole = login.role.toUpperCase()

        if(role.includes(lrole) == false) next({ name: auth.cekRoleUrl(lrole) })
      }
    } else {
      next({ name: 'login' })
    }
  }

  next()
});

export default router;
