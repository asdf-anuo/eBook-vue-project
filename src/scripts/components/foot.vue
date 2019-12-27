<template>
  <footer>
    <div v-for="(foot,i) in foots" :key="i">
      <router-link :to="{name:foot.name}">
        <mt-badge class="hot" v-if="i==2">{{booknum}}</mt-badge>
        <i class="icon iconfont" v-html="foot.icon"></i>
        <span>{{foot.txt}}</span>
      </router-link>
    </div>
  </footer>
</template>

<script>
import store from "../vuex/store";
export default {
  data() {
    return {
      foots: [
        {
          txt: "首页",
          path: "/index/home",
          name: "home",
          icon: "&#xe61f;"
        },
        {
          txt: "分类",
          path: "/index/classify",
          name: "classify",
          icon: "&#xe709;"
        },
        {
          txt: "书架",
          path: "/index/mybooklist",
          name: "mybooklist",
          icon: "&#xe71b;"
        },
        {
          txt: "我的",
          path: "/index/mine",
          name: "mine",
          icon: "&#xe636;"
        }
      ]
    };
  },
  computed: {
    booknum() {
      return this.$store.state.booknum;
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background-color: #fff;
  display: flex !important;
  z-index: 999;
  border-top: 1px solid rgb(220, 220, 220);
  div {
    flex: 1;
    height: 1rem;
    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      text-align: center;
      padding: 0.1rem 0;
      color: #666;
      position: relative;
      i {
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.45rem !important;
      }
      span {
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.24rem !important;
      }
      .hot {
        position: absolute;
        top: .02rem;
        left: 60%;
        width: 0.3rem;
        height: .3rem;
        line-height: .3rem;
        border-radius: .3rem;
        font-size: 0.16rem !important;
        background-color: #ff5757;
      }
    }
    .nav-active,
    .router-link-exact-active {
      color: #ff5757;
      border-color: #ff5757;
    }
  }
}
</style>



