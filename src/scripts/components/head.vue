<template>
  <div id="header-box">
    <mt-header :title="title" id="mt-header">
      <div @click="goHome" slot="left" v-if="hidden">
        <img src="../../assets/image/logo2.png" class="logo-img">
      </div>
      <div @click="goBack" slot="left" v-if="show">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button slot="right" @click="goSearch">
        <i class="icon iconfont icon-search3"></i>
      </mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goSearch() {
      this.$router.push({ name: "search" });
    },
    goHome() {
      this.$router.push({ name: "home" });
    }
  },
  props: ["title", "show", "hidden"]
};
</script>

<style scoped>
#mt-header{
  /* background-color: #e82217; */
  background-color: #faeeed;
  color: #000;
  font-size: .34rem;
  width: 100%;
  height: .8rem;
  line-height: .8rem;

}

#mt-header i{
  font-size: .34rem;
}

#mt-header .logo-img {
  width: 2.1rem;
  height: 0.36rem;
}
</style>


