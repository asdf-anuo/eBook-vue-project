<template>
  <div>
    <Head title="成长励志" :show="false" :hidden="true"></Head>
    <Ad></Ad>
    <div class="classify" v-if="flag">
      <ul>
        <li @click="gotoDetail(item._id)" v-for="(item,i) in success" :key="i">
          <div class="left">
            <img :src="item.iconUrl">
          </div>
          <div class="right">
            <h3>{{item.title}}</h3>
            <h4>{{item.author}}</h4>
            <h5>{{item.description}}</h5>
            <h6>
              <span>{{item.category}}</span>
            </h6>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Ad from "./ad.vue";
import { Indicator, Toast } from "mint-ui";
export default {
  components: {
    Ad
  },
  data() {
    return {
      flag:false,
      recommond:{}
    };
  },
  methods: {
    gotoDetail(id) {
      // alert(id);
      this.$router.push({ name: "bookdetail", params: { id: id } });
    }
  },
  created() {
    Indicator.open({
      text: "拼命加载中...",
      spinnerType: "triple-bounce"
    });
    this.$http.get("http://localhost:1810/vue/typeSuccess").then(res => {
      // console.log(res);
      this.success = res.data.result;
      this.flag = true;
      Indicator.close();
      Toast({
        message: "加载成功！",
        iconClass: "icon icon-success",
        duration: 1000
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.classify {
  border-top: 0.1rem solid #f5f2f2;
  li {
    display: flex;
    background-color: #fff;
    overflow: hidden;
    border: 0.1rem solid #f5f2f2;
    .left {
      width: 30%;
      margin: 2%;
      img {
        display: block;
        width: 100%;
        height: 98%;
        border-radius: 10px;
      }
    }
    .right {
      width: 60%;
      margin: 5% 3%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: 0.38rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h4 {
        font-size: 0.24rem;
        color: #333;
      }
      h5 {
        font-size: 0.16rem;
        color: #666;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
      h6 {
        span {
          display: inline-block;
          font-size: 0.2rem;
          color: #666;
          padding: 0.05rem 0.1rem;
          text-align: center;
          border-radius: 0.2rem;
          background-color: rgb(238, 237, 237);
        }
      }
    }
  }
}
</style>
