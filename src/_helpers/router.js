import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import PesquisaPage from '../home/PesquisaPage'
import TagPage from '../home/TagPage'
import LoginPage from '../login/LoginPage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/pesquisa', component: PesquisaPage },
    { path: '/login', component: LoginPage },
    { path: '/tag', component: TagPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})