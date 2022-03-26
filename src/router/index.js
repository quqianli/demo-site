import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import PageFrame from "@/layout/components/PageFrame.vue";
import store from "@/store";
import { menuTree } from "@/apis/personal";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    // redirect: '/app',
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
      },
      {
        path: "404",
        name: "NotFound",
        component: () => import("@/views/404.vue"),
      },
      {
        path: "personal",
        name: "Personal",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/personal/index.vue"),
        redirect: "/personal/profile",
        children: [
          {
            path: "profile",
            name: "PersonalProfile",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/personal/Profile.vue"),
          },
          {
            path: "changepsw",
            name: "PersonalChangePsw",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/personal/ChangePsw.vue"),
          },
          {
            path: "Message",
            name: "PersonalMessage",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/personal/Message/index.vue"),
          },
        ],
      },
      // {
      //   path: "app",
      //   name: "App",
      //   meta: {
      //     requireAuth: true,
      //   },
      //   redirect: '/app/user',
      //   component: PageFrame,
      //   children: [
      //     {
      //       path: "user",
      //       name: "AppUser",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/app/User.vue"),
      //     },
      //     {
      //       path: "dept",
      //       name: "AppDept",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/app/Dept.vue"),
      //     },
      //     {
      //       path: "role",
      //       name: "AppRole",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/app/Role.vue"),
      //     },
      //     {
      //       path: "resource",
      //       name: "AppResource",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/app/Resource.vue"),
      //     }
      //   ],
      // },
      // {
      //   path: 'sys',
      //   meta: {
      //     requireAuth: true
      //   },
      //   component: PageFrame,
      //   redirect: '/sys/user',
      //   children: [
      //     {
      //       path: "user",
      //       name: "SysUser",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/sys/User.vue"),
      //     },
      //     {
      //       path: "notice",
      //       name: "SysNotice",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/sys/Notice.vue"),
      //     }
      //   ],
      // },
      // {
      //   path: "logs",
      //   name: "LogsManagement",
      //   meta: {
      //     requireAuth: true,
      //   },
      //   component: PageFrame,
      //   redirect: '/logs/visit',
      //   children: [
      //     {
      //       path: "visit",
      //       name: "VisitsLog",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/logs/Visit.vue"),
      //     },
      //     {
      //       path: "operation",
      //       name: "OprationsLog",
      //       meta: {
      //         requireAuth: true,
      //       },
      //       component: () => import("@/views/logs/Operation.vue"),
      //     }
      //   ],
      // },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "404",
  //   redirect: '/404'
  // }
];
const route404 = {
  path: "/:pathMatch(.*)*",
  name: "404",
  redirect: "/404",
};
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const isLogin = store.getters["user/isLogin"];

  if (to.path === "/login") {
    if (isLogin) {
      return { name: "Home" };
    }
    return true;
  }
  if (to.meta.requireAuth) {
    if (!isLogin) {
      return { name: "Login" };
    }
  }
  await addDynamic();
  if (!to.name && hasRoute(to)) {
    return { ...to };
  }
  if (to.path === "/" && store.state.firstRoute) {
    return store.state.firstRoute;
  }
  return true;
});
function hasRoute(to) {
  const item = router.getRoutes().find((item) => item.path === to.path);
  return !!item;
}
function addDynamic() {
  if (store.state.routeLoaded) {
    return;
  }
  return menuTree().then((res) => {
    // 添加动态路由
    if (res.data && res.data.length) {
      addDynamicRoutes(res.data);
    }
    router.addRoute(route404);
    store.commit("setRouteLoaded", true);
    // 保存菜单树
    store.commit("setMenuTree", res.data);
  });
}

const modules = import.meta.glob('../views/**/*.vue');
function addDynamicRoutes(data, parent) {
  data.forEach((item, i) => {
    const route = {
      path: item.path,
      name: item.name,
      meta: {
        title: item.title,
        icon: item.icon,
      },
      children: []
    };
    if (parent) {
      if (item.parentId !== 0) {
        const compParr = item.path.replace("/", "").split("/");
        const l = compParr.length - 1;
        const compPath = compParr
          .map((v, i) => {
            return i === l ? v.replace(/\w/, (L) => L.toUpperCase()) + ".vue" : v;
          })
          .join("/");
        route.path = compParr[l];
        route.component = modules[`../views/${compPath}`];
        parent.children.push(route);
      }
    } else {
      if (item.children && item.children.length) {
        route.redirect = item.children[0].path;
        addDynamicRoutes(item.children, route)
      }
      route.component = PageFrame;
      if (i === 0) {
        store.commit("setFirstRoute", route);
      }
      router.addRoute("Home", route);
    }
  });
}
export default router;
