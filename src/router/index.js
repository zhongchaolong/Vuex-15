// 导入相关第三方包
import Vue from 'vue'
import Router from 'vue-router'

// 导入路由守卫
import beforeEach from './beforeEach.js';

// 导入被路由控制的组件
// 备注: 这里的@符合就是src目录, 如果导入的是js vue json文件, 可以省略后缀名
import Login from '@/component/login/Login'
import Store from '@/component/store/Store'
import GoodsList from '@/component/store/goods/List'
import GoodsDetail from '@/component/store/goods/Detail'
import Shopcart from '@/component/store/shopcart/Shopcart'
import OrderCommit from '@/component/store/order/Commit'
import OrderPay from '@/component/store/order/Pay'
import OrderComplete from '@/component/store/order/Complete.vue'

// 启动路由插件
Vue.use(Router)

// 创建路由实例, 并添加路由守卫
let router = new Router({
  routes: [
    // 首页就是商品列表页
    { name: 'index', path: '/', component: Store, children:
      [
        // 商品
        { name: 'goodsList', path: 'goods/list', component: GoodsList },
        { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail },
        // 购物车
        { name: 'shopcart', path: 'shopcart', component: Shopcart },
        // 订单
        { name: 'orderCommit', path: 'order/commit/:ids', component: OrderCommit },
        { name: 'orderPay', path: 'order/pay/:id', component: OrderPay },
        { name: 'orderComplete', path: 'order/complete', component: OrderComplete },
      ]
    },

    // 登陆
    { name: 'login', path: '/login', component: Login },
  ]
});
router.beforeEach(beforeEach)

export default router
