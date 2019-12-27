<template>
  <div>
    <!-- 广告图start -->
    <div class="ad" @click="gotoAD" v-show="flag">
      <span @click.stop="deleteAD">关闭</span>
      <img src="../../assets/image/bannerAD.png" alt class="img-ad">
    </div>
    <!-- 广告图end -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      flag:true
    }
  },
  methods: {
    deleteAD() {
      // alert("移除广告");
      this.flag=false;
    },
    gotoAD() {
      // alert("去新用户注册页面");
      this.$router.push({ name: "register" });
    }
  }
};
</script>


<style lang="scss" scoped>
.ad {
  padding:.05rem;
  position: relative;
  span {
    position: absolute;
    top: .1rem;
    right: .1rem;
    display: inline-block;
    font-size: .16rem;
    // width: 20px;
    // height: 20px;
    // line-height: 20px;
    // text-align: center;
    color: rgba(77, 77, 77,.6);
    display: inline-block;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
