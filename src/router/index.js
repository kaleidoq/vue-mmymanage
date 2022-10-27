import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Cookie from 'js-cookie'

// 消除冗余的路由链接
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


const routes = [{
        path: '/',
        name: 'main',
        component: Main,
        redirect: '/home',
        children: [
            //    {
            //     path: '/home',
            //     name: 'home',
            //     component: () =>
            //         import ('../views/Home.vue')
            // }, {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () =>
            //         import ('../views/Mall.vue')
            // }, {
            //     path: '/user',
            //     name: 'user',
            //     component: () =>
            //         import ('../views/User.vue')
            // }, {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () =>
            //         import ('../views/PageOne.vue')
            // }, {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () =>
            //         import ('../views/PageTwo.vue')
            // }, 
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },

]

const router = new VueRouter({
    routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
        // 判断token在不在
    if (!token && to.name !== 'login') {
        // token不存在，没登陆，跳转登录页
        next({ name: 'login' })
    } else {
        // token存在，放行
        next()
    }
})

export default router