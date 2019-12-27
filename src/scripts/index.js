console.log("Vue + MintUI + Node.js + MangoDB + webpack 模块化编程");

import Vue from "vue";
import MintUI from "mint-ui";
Vue.use(MintUI); // 全局声明  可以使用 Mint-UI 

import VueResource from "vue-resource";
Vue.use(VueResource); // 全局声明 可以使用 this.$http

import App from "./components/app.vue";
Vue.component("App", App);

import router from "./router"
import store from "./vuex/store"

//全局注册组件
import Head from "./components/head.vue";
Vue.component("Head", Head);

import ToTop from "./components/toTop.vue";
Vue.component("ToTop", ToTop);

import Ad from "./components/ad.vue";
Vue.component("Ad", Ad);

const vm = new Vue({
    router,
    store,
    data: {
        msg: "vue + MintUI + webpack + Node + MangoDB",
        word: "wuhan1810-daydayup",
    },
    created() {},
    mounted() {}
}).$mount("#app")