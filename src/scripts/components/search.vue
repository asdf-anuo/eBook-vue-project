<template>
  <div>
    <Head title="搜索" :show="true"></Head>
    <div id="searchInp">
      <input autofocus="autofocus" v-model="value" type="search" placeholder="可输入作者或书名进行搜索...">
      <span @click="search">确 定</span>
    </div>
    <div class="hotsearch">大家都在搜</div>
    <ul class="searchtable">
      <li>都挺好</li>
      <li>白夜行</li>
      <li>火神</li>
      <li>归去来</li>
      <li>失踪的总统</li>
      <li>影响力</li>
      <li>长夜难明</li>
      <li>漫画中国史</li>
      <li>再见王沥川</li>
      <li>大江大河</li>
      <li>我的总裁未婚妻</li>
      <li>极品透视</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  watch: {
    value: function(newVal) {
      // console.log(newVal);
    }
  },
  methods: {
    search() {
      if (this.value != "") {
        alert(this.value);
      }else{
        alert("请给点关键信息哦~")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#searchInp {
  width: 100%;
  height: 0.8rem;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: #666;
  display: flex;
  input {
    border: none;
    width: 80%;
    text-indent: 0.2rem;
    background-color: #f3f3f3;
  }
  span {
    width: 20%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: #e4e2e2;
  }
}

.hotsearch {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.24rem;
  margin: 0.5rem 0 0.2rem;
  text-indent: 0.3rem;
  background-color: #f5f3f3;
  color: #999;
}
.searchtable {
  li {
    float: left;
    margin: 1%;
    width: 29%;
    height: 0.4rem;
    line-height: 0.4rem;
    border-radius: 0.4rem;
    text-align: center;
    font-size: 0.24rem;
    color: #999;
    border: 1px solid rgb(190, 190, 190);
  }
}
</style>

