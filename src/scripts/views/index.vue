<template>
  <div class="mainbox">
    <router-view class="childview"></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from "../components/foot.vue";
export default {
  components: {
    Foot
  }
};
</script>

<style lang="scss" scoped>
.mainbox{
  display:flex;
  flex-direction: column;
  .childview{
    flex:1
}
}
</style>


