import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from '../store/index'

// 判断路由独享守卫
var hasUrl = (url,next) => {
  var arr = store.state.user.menus_url
  if (arr.some(i => i == url)) {
    next()
  } else {
    next('/home')
  }
}

var router = new Router({
  routes: [{
      path: '/login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [{
          path: 'home',
          component: () => import('../pages/home/home.vue'),
          name: "管理员管理"
        },
        {
          path: 'menu',
          component: () => import('../pages/menu/menu.vue'),
          name: "菜单列表",
          beforeEnter(to, from, next) {
            hasUrl('/menu',next)
          }

        },
        {
          path: 'role',
          component: () => import('../pages/role/role.vue'),
          name: "角色列表",
          beforeEnter(to, from, next) {
            hasUrl('/role',next)
          }
        },
        {
          path: 'manage', //管理员管理
          component: () => import('../pages/manage/manage.vue'),
          name: "管理员管理",
          beforeEnter(to, from, next) {
            hasUrl('/manage',next)
          }
        },
        {
          path: "cate",
          component: () => import("../pages/cate/cate.vue"),
          name: "商品分类列表",
          beforeEnter(to, from, next) {
            hasUrl('/cate',next)
          }
        },
        {
          path: "spec",
          component: () => import("../pages/spec/spec.vue"),
          name: "商品规格列表",
          beforeEnter(to, from, next) {
            hasUrl('/spec',next)
          }
        },
        {
          path: 'goods', //商品分类
          component: () => import('../pages/goods/goods.vue'),
          name: "商品列表",
          beforeEnter(to, from, next) {
            hasUrl('/goods',next)
          }
        },
        {
          path: "member",
          component: () => import("../pages/member/member.vue"),
          name: "会员列表",
          beforeEnter(to, from, next) {
            hasUrl('/member',next)
          }
        },
        {
          path: "banner",
          component: () => import("../pages/banner/banner.vue"),
          name: "轮播图列表",
          beforeEnter(to, from, next) {
            hasUrl('/banner',next)
          }
        },
        {
          path: "seckill",
          component: () => import("../pages/seckill/seckill.vue"),
          name: "秒杀列表",
          beforeEnter(to, from, next) {
            hasUrl('/seckill',next)
          }
        },
        {
          path: "",
          redirect: "home"
        }

      ]
    },

  ]
})

//登录拦截
router.beforeEach((to, from, next) => {
  //如果前往登录页面，next()
  if (to.path === "/login") {
    next()
    return;
  }
  //如果去的不是登录，就要判断store.user. user是true,next();user-null,next('/login')
  if (store.state.user) {
    next();
    return;
  }
  next("/login")
})


export default router
