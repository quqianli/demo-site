import { createStore } from 'vuex'
// 引入子模块
import user from './modules/user'
export default createStore({
  state: {
    routeLoaded: false, // 菜单和路由是否已经加载
    firstRoute: null, // 第一个路由，用于进入主页时的redirect
    menuTree: null // 菜单树
  },
  mutations: {
    setRouteLoaded(state, loaded) {
      // 改变菜单和路由的加载状态
      state.routeLoaded = loaded;
    },
    setFirstRoute(state, route) {
      state.firstRoute = route;
    },
    setMenuTree(state, data) {
      state.menuTree = data;
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
