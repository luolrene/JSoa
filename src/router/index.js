import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: resolve => require(['@/views/integrated/fixedAssets/qrCode'], resolve)
    },
    {
      path: '/public',
      component: resolve => require(['@/components/MainComponent'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['@/components/FullComponent'], resolve),
          children: [
            {
              path: '/public/knowledge/news',
              name: 'news',
              component: resolve => require(['@/views/public/knowledge/details'], resolve),
              menu_ID: 'news',
              meta: { requireAuth: 1, title: '知识库' }
            }
          ]
        }
      ]
    },
    {
      path: '/default',
      component: resolve => require(['@/components/MainComponent'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['@/components/FullComponent'], resolve),
          children: [
            {
              path: '/default',
              name: 'default',
              component: resolve => require(['@/views/default/index'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: resolve => require(['@/components/FullComponent'], resolve),
      children: [
        {
          path: '/error/404',
          name: 'error-404',
          component: resolve => require(['@/views/common/error/404'], resolve)
        }
      ]
    }
  ]
})
