import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // username: "" || "游客",
        username: "",
        booknum: 0, // 我的书架上的书本数量
        books: {}, // 我的书架上的所有书籍
        book: {},// 书籍详情
        comments:{} // 书籍的所有评论
    },
    getters: {},
    actions: {
        changeBooknum(context) {
            context.commit("changeBooknum")
        },

    },
    mutations: {
        changeBooknum(state) {
            state.booknum++;
        }
    },

})

export default store;