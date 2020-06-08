import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home'
// import Product from '@/pages/product'
// import Cart from '@/pages/cart'
// import Personal from '@/pages/personal'
// import Search from '@/pages/search'
// import Category from '@/pages/category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Home',
      path: '/home',
      component: () => import('@/pages/home'),//路由懒加载
      children:[
        {
          name: 'home-product',
          path: 'product',
          component:() => import('@/pages/product')
        }
      ]
    },
    {
      name: 'Category',
      path: '/category',
      component: () => import('@/pages/category')
    },
    {
      name: 'Cart',
      path: '/cart',
      component: () => import('@/pages/cart')
    },
    {
      name: 'Personal',
      path: '/personal',
      component: () => import('@/pages/personal')
    },
    {
      name: 'Search',
      path: '/search',
      component: () => import('@/pages/search')
    },
    {
      path: '*',
      redirect:'/home'
    }
  ]
})
