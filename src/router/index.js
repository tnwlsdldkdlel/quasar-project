import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // 추가한 부분
  // const userStore = useUserStore();

  // Router.beforeEach((to, from, next) => { // 페이지를 이동하기 전에 호출되는 함수
  //   if (to.fullPath !== "/login" && !userStore.isLoggedIn) {
  //     // /login으로 가고 있지 않고 로그인되어 있지 않으면 /login으로 redirect
  //     // 로그인하지 않은 상태에서 /를 요청하는 경우 (프로젝트가 처음 실행될 때)
  //     next("/login");
  //   } else if (to.fullPath == "/login" && userStore.isLoggedIn) {
  //     // /login으로 가고 있고 로그인되어 있으면 /으로 redirect
  //     // 로그인한 상태에서 /login을 요청하는 경우
  //     next("/");
  //   } else {
  //     next();
  //   }
  // });

  return Router
})
