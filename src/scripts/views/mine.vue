<template>
  <div>
    <Head title="个人中心" :show="false" :hidden="true"></Head>

    <div v-show="flag">
      <div class="ifLogin">
        <h2>
          <img src="../../assets/image/personlogo.jpg" alt />
        </h2>
        <h3>
          <p>亲 你还没有登录哦</p>
          <span class="gohome" @click="goaround">不想登陆 去首页随便逛逛</span>
        </h3>
      </div>
      <Ad></Ad>
      <div class="gotoLogin">
        <button @click="login">去 登 录</button>
        <button @click="register">去 注 册</button>
      </div>
    </div>

    <div v-show="!flag">
      <div class="ifLogin">
        <h2>
          <img src="../../assets/image/personlogo.jpg" alt />
        </h2>
        <h3>
          <p>{{username}}</p>
          <span class="lv">LV.1</span>
        </h3>
      </div>
      <div class="myinfo">
        <p @click="goPaymoney">
          <span>我的余额</span>
          <span class="paymoney">充值</span>
        </p>
        <p @click="goMybooklist">
          <span>我的书架</span>
          <span class="booknum">{{booknum}}</span>
        </p>
        <p>
          <span>我的消息</span>
          <span class="mymsg">1</span>
        </p>

        <p>
          <span>设置</span>
          <span class="shezhi">
            <i class="icon iconfont icon-setting"></i>
          </span>
        </p>
        <p @click="problem">
          <span>客服</span>
          <span class="kefu">
            <i class="icon iconfont icon-erji"></i>
          </span>
        </p>
      </div>
    </div>

    <div class="banner">
      <mt-swipe :show-indicators="true" :continuous="true" :auto="2000">
        <mt-swipe-item v-for="(item,i) in banner" :key="i">
          <img :src="item.iconUrl" class="img-banner" @click="goaround" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from "mint-ui";
import store from "../vuex/store";
export default {
  data() {
    return {
      flag: true,
      banner: {},
      username: store.state.username,
      booknum: store.state.booknum
    };
  },
  created() {
    //判断是否登录状态
    if (this.username != "") {
      this.flag = false;
    } else {
      this.flag = true;
    }
    this.getInitData();
  },
  methods: {
    getInitData() {
      Indicator.open({
        text: "数据加载中",
        spinnerType: "fading-circle"
      });
      this.$http
        .get("http://localhost:1810/vue/allBooks", {
          params: {
            limit: 8
          }
        })
        .then(res => {
          // console.log(res);
          this.banner = res.data.result;
          Indicator.close();
        })
        .catch(err => {
          Indicator.close();
          Toast({
            message: "加载失败",
            duration: 1000
          });
        });
    },
    goPaymoney() {
      MessageBox.alert("此接口暂未开通 <br /> 加客服微信：330202777", "抱歉");
    },
    goMybooklist() {
      this.$router.push({ name: "mybooklist" });
    },
    login() {
      this.$router.push({ name: "login" });
    },
    register() {
      this.$router.push({ name: "register" });
    },
    goaround() {
      this.$router.push({ name: "home" });
    },
    problem() {
      MessageBox.alert(
        "客服微信：330202777 <br /> 客服电话：18616160797",
        "请联系客服"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.ifLogin {
  width: 100%;
  display: flex;
  h2 {
    width: 30%;
    img {
      margin: 10%;
      width: 80%;
      height: 80%;
      border-radius: 50%;
    }
  }
  h3 {
    width: 60%;
    margin-left: 5%;
    p {
      margin-top: 0.4rem;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.4rem;
      color: #333;
    }
    .gohome {
      display: block;
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: 0.2rem;
      color: rgb(99, 159, 249);
    }
    .lv {
      display: inline-block;
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: 0.2rem;
      background-color: #ff7575;
      color: #fff;
      border-radius: 0.2rem;
      padding: 0.1rem 0.2rem;
    }
  }
}

.myinfo {
  width: 100%;
  margin-top: 0.4rem;
  p {
    width: 90%;
    margin-left: 5%;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    justify-content: space-between;
    span {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.28rem;
      color: #333;
    }
    .paymoney,
    .mymsg,
    .booknum {
      display: inline-block;
      font-size: 0.2rem;
      border-radius: 0.2rem;
      width: 0.8rem;
      text-align: center;
      background-color: #ff7575;
      color: #fff;
    }
    .shezhi,
    .kefu {
      i {
        font-size: 0.4rem;
        color: #333;
      }
    }
  }
}

// 去登陆注册
.gotoLogin {
  width: 100%;
  button {
    display: block;
    outline: none;
    border: none;
    box-shadow: none;
    background: #ff7575;
    border: 1px solid #eceaea;
    width: 90%;
    height: 1rem;
    border-radius: 1rem;
    font-size: 0.3rem;
    padding: 0.1rem 0.4rem;
    box-sizing: border-box;
    margin-left: 5%;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    color: #fff;
  }
}

// 轮播图
.banner {
  width: 100%;
  height: 400px;
  .img-banner {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
