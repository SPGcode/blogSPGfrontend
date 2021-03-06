import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import {usersModule} from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/postview/:id',
    name: 'postview',
    component: () => import(/* webpackChunkName: "postview" */ '../views/Postview.vue')
  },
  {
    path: '/profileview',
    name: 'profileview',
    component: () => import(/* webpackChunkName: "postview" */ '../views/Profileview.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  const privateRoute = to.matched.some(record => record.meta.requireAuth);
    if(privateRoute && !localStorage.token){
      next({name: 'Home'})
    }else{
      next();
    }

});

export default router
