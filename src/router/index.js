import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuth'

import BlankLayout from '@/layouts/BlankLayout.vue'
import HorizontalLayout from '@/layouts/HorizontalLayout.vue'
import VerticalLayout from '@/layouts/VerticalLayout.vue'
import LandingIndex from '../views/landing/Home.vue'
import LandingAbout from '../views/landing/About.vue';
import LandingPostDetail from '../views/landing/PostDetail.vue';
import AuthLogin from '../views/auth/Login.vue';
import AuthRegister from '../views/auth/Register.vue';
import DashboardIndex from '../views/dashboard/index.vue';
import PostIndex from '../views/dashboard/posts/index.vue'
import PostCreate from '../views/dashboard/posts/create.vue';
import PostEdit from '../views/dashboard/posts/edit.vue';

const redirectToHomeOnLoggedIn = (to, from, next) => {
  if (useAuthStore().loggedIn) next({ name: "dashboard" });
  else next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing.index',
      component: LandingIndex,
      meta: {
        layout: HorizontalLayout
      }
    },
    {
      path: '/about',
      name: 'landing.about',
      component: LandingAbout,
      meta: {
        layout: HorizontalLayout
      }
    },
    ,
    {
      path: '/article/:postSlug',
      name: 'landing.post.detail',
      component: LandingPostDetail,
      meta: {
        layout: HorizontalLayout
      }
    },
    {
      path: '/login',
      name: 'auth.login',
      component: AuthLogin,
      beforeEnter: redirectToHomeOnLoggedIn,
      meta: {
        layout: BlankLayout
      }
    },
    {
      path: '/register',
      name: 'auth.register',
      component: AuthRegister,
      beforeEnter: redirectToHomeOnLoggedIn,
      meta: {
        layout: BlankLayout
      }
    },
    ,
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardIndex,
      meta: {
        requireAuth: true,
        layout: VerticalLayout
      },
    },
    {
      path: '/dashboard/posts',
      name: 'posts.index',
      component: PostIndex,
      meta: {
        requireAuth: true,
        layout: VerticalLayout
      },
    },
    {
      path: '/dashboard/posts/create',
      name: 'posts.create',
      component: PostCreate,
      meta: {
        requireAuth: true,
        layout: VerticalLayout
      },
    },
    {
      path: '/dashboard/posts/edit/:postId',
      name: 'posts.edit',
      component: PostEdit,
      meta: {
        requireAuth: true,
        layout: VerticalLayout
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pagenotfound',
      meta: {
        layout: BlankLayout
      },
      component: () => import('../views/PageNotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !useAuthStore().loggedIn)
    next({ name: "login" });
  else next();
});

export default router
