// 配置 路由  
import Vue from "vue";
import VueRouter from "vue-router";

// 0
Vue.use(VueRouter);

// 1. 定义组件
import Guide from "./views/guide.vue";
import Index from "./views/index.vue";
import Classify from "./views/classify.vue";
import Mybooklist from "./views/mybooklist.vue";
import Mine from "./views/mine.vue";
import App from "./components/app.vue";

//登录
import Login from "./components/login.vue";
// 注册
import Register from "./components/register.vue";
//书本详情
import Bookdetail from "./views/bookdetail.vue";
//搜索页面
import Search from "./components/search.vue";
// 校园类
import Xiaoyuan from "./components/xiaoyuan.vue";
// 婚姻两性
import Sex from "./components/sex.vue";
// 外国文学
import Waiguo from "./components/waiguo.vue";
// 成功励志
import Success from "./components/success.vue";

// 2. 配置 routes 
const routes = [{
        path: "",
        name: "guide",
        component: Guide
    }, {
        path: "/index",
        name: "index",
        component: Index,
        children: [{
            path: "",
            redirect: {
                name: "home"
            }
        }, {
            path: "home",
            name: 'home',
            component: App
        }, {
            path: "classify",
            name: 'classify',
            component: Classify
        }, {
            path: "mybooklist",
            name: 'mybooklist',
            component: Mybooklist
        }, {
            path: "mine",
            name: 'mine',
            component: Mine
        }, {
            path: "*",
            redirect: {
                name: "home"
            }
        }]
    },
    {
        path: "/bookdetail/:id",
        name: "bookdetail",
        component: Bookdetail
    },
    {
        path: "/xiaoyuan",
        name: "xiaoyuan",
        component: Xiaoyuan,
    },
    {
        path: "/success",
        name: "success",
        component: Success,
    },
    {
        path: "/waiguo",
        name: "waiguo",
        component: Waiguo,
    },
    {
        path: "/sex",
        name: "sex",
        component: Sex,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    }, {
        path: "/register",
        name: "register",
        component: Register,
    }, {
        path: "/search",
        name: "search",
        component: Search,
    }, {
        path: "*",
        redirect: {
            name: "home"
        }
    }
]

// 3. 创建 router
const router = new VueRouter({
    routes,
    mode: "hash"
})

// 4. 挂载 根实例 
export default router;