<template>
  <div>
    <Head title="登录" :show="true"></Head>
    <!-- 用户登录start -->
    <div class="login-box">
      <form>
        <input type="text" v-model="username" placeholder="请输入用户名">
        <input type="password" v-model="password" placeholder="请输入密码">
        <button @click="gotoLogin">登 录</button>
        <button @click="gotoRegister">新用户 去注册</button>
      </form>

      <h3>---------------第三方账号登录--------------</h3>

      <div class="otherlogin">
        <p @click="lgnWY">
          <i class="icon iconfont icon-CN_NetEasemusic"></i>
          <span>网易邮箱</span>
        </p>
        <p @click="lgnXL">
          <i class="icon iconfont icon-weibo"></i>
          <span>新浪微博</span>
        </p>
        <p @click="lgnWX">
          <i class="icon iconfont icon-weixin3"></i>
          <span>微信登录</span>
        </p>
        <p @click="lgnQQ">
          <i class="icon iconfont icon-QQkongjian"></i>
          <span>QQ空间</span>
        </p>
      </div>
    </div>
    <!-- 用户登录end -->
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from "mint-ui";
import store from "../vuex/store";
export default {
  data() {
    return {
      store,
      value: "",
      username: "",
      password: ""
    };
  },
  methods: {
    gotoLogin() {
      this.$http
        .post("http://localhost:1810/vue/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          // console.log(res);
          if (res.body.code == 200) {
            //登录成功，把登录的用户名存在store里面
            store.state.username = this.username;
            MessageBox('恭喜你', '登陆成功');
            //登录成功，跳转到首页
            this.$router.push({ name: "home" });
          } else {
            // alert(res.body.msg);
            MessageBox('抱歉', '用户名或密码有误，请重新登录');
          }
        });
    },
    gotoRegister() {
      this.$router.push({ name: "register" });
    },
    lgnWY(){
      MessageBox('提示', '接口未打通，正在开发中...');
    },
    lgnXL(){
      MessageBox('提示', '接口未打通，正在开发中...');
    },
    lgnWX(){
      MessageBox('提示', '接口未打通，正在开发中...');
    },
    lgnQQ(){
      MessageBox('提示', '接口未打通，正在开发中...');
    },

  }
};
</script>


<style lang="scss" scoped>
.login-box {
  h3 {
    margin-top: 0.5rem;
    font-size: 0.3rem;
    color: #999;
    text-align: center;
  }
  .otherlogin {
    display: flex;
    p {
      display: flex;
      flex-direction: column;
      width: 22%;
      text-align: center;
      margin: 0.5rem 1% 0.5rem 1%;
      i {
        font-size: 0.6rem;
        color: #ff5757;
      }
      span {
        margin: 0.2rem;
        font-size: 0.2rem;
      }
    }
  }
  input,
  button {
    display: block;
    outline: none;
    border: none;
    box-shadow: none;
    background: #f1f1f1;
    border: 1px solid #ffe9e6;
    width: 80%;
    height: 1rem;
    border-radius: 1rem;
    font-size: 0.3rem;
    padding: 0.1rem 0.4rem;
    box-sizing: border-box;
    margin-left: 10%;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    color: #222;
  }
}
.login-box button {
  background-color: #f86a6a;
  color: #fff;
  font-size: 0.3rem;
}
</style>

