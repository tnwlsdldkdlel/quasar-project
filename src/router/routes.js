import MainLayout from 'layouts/MainLayout.vue';

import BlogLayout from 'layouts/Blog/MainLayout.vue';
import MyBlogLayout from 'layouts/Blog/MyLayout.vue';

import Main from 'pages/Main.vue';

import Join from 'pages/User/Join.vue';
import Login from 'pages/User/Login.vue';
import FindId from 'pages/User/FindId.vue';

import Blog from 'pages/Blog/Main.vue';
import MyBlog from 'pages/Blog/My.vue';

const routes = [
  {
    path: '/',
    children: [
      { path: '', component: Main, meta: { layout: MainLayout } },
      { path: 'user/join', component: Join },
      { path: 'user/login', component: Login },
      { path: 'user/findId', component: FindId },

      { path: 'blog', component: Blog, meta: { layout: BlogLayout } },
      { path: 'blog/:user_id', component: MyBlog, meta: { layout: MyBlogLayout }}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
