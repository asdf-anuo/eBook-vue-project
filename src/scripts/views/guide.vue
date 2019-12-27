<template>
  <div>
    <mt-swipe :continuous="false" :auto="0">
      <mt-swipe-item v-for="(img,i) in imgs" :key="i">
        <img @touchmove="getIndex(i)" :src="img" alt class="img-guide">
        <!-- <span v-show="flag4">开启我的阅读</span> -->
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      flag4:false,
      imgs: [
        require("../../assets/image/guide5.JPG"),
        require("../../assets/image/guide6.JPG"),
        require("../../assets/image/guide7.JPG"),
        require("../../assets/image/guide1.JPG")
      ]
    };
  },
  mounted() {
    //判断用户第几次打开页面or 第几次进入app
    if (localStorage.visitCount) {
      localStorage.visitCount++;
      //如果是第四次以后 就不需要开机动画 直接去首页
      if (localStorage.visitCount > 4) {
        this.$router.push({ name: "home" });
      }
    } else {
      localStorage.visitCount = 1;
    }
  },
  methods: {
    getIndex(index) {
      if (index == this.imgs.length - 1) {
        // this.flag = true;
        this.$router.push({ name: "home" });
      }
    }
  }
};
</script>


<style scoped>
mt-swipe,
.img-guide {
  width: 100%;
  height: 100%;
}
</style>

