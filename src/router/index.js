import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/Layout'
import stocklist from '@/views/StockList'
import helloworld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/stocklist',
          name: 'stocklist',
          component: stocklist
        },
        {
          path: '/helloworld',
          name: 'helloworld',
          component: helloworld,
        },
      ]
    }
  ]
})

// 导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
 
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// })

export default router