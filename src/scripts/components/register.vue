<template>
  <div>
    <Head title="新用户注册" :show="true"></Head>
    <div class="reg-ad-img">
      <img src="../../assets/image/reg_banner.png" alt="image">
    </div>
    <!-- 新用户注册start -->
    <div class="register-box">
      <div class="fuli-box">
        <p>
          <span>
            <i class="icon iconfont icon-icon6"></i>五天
          </span>免费畅读
        </p>
        <p>
          <span>
            <i class="icon iconfont icon-hongbao"></i>五元
          </span>阅读红包
        </p>
        <p>
          <span>
            <i class="icon iconfont icon-liwu"></i>更多
          </span>新人礼包
        </p>
      </div>

      <form>
        <label for="username">
          <input
            type="text"
            id="username"
            @change="FlagName"
            v-model="user.username"
            placeholder="请输入4-10位长度的用户名"
          >
          <span v-show="flag1">提示:用户名长度为4-10位，不能以数字开头</span>
        </label>

        <label for="password">
          <input
            type="password"
            id="password"
            @change="FlagPwd"
            v-model="user.password"
            placeholder="请输入6-12位的密码"
          >
          <span v-show="flag2">提示:密码长度为6-16位，由数字字母组成</span>
        </label>

        <label for="usertel">
          <input
            type="number"
            id="usertel"
            @change="FlagTel"
            v-model="user.usertel"
            placeholder="请输入手机号"
          >
          <span v-show="flag3">提示:手机号码格式有误，请重新输入</span>
        </label>

        <button @click="gotoRegister">立即注册，领取新人福利</button>
        <button @click="gotoLogin">已有账号，去登录</button>
      </form>
    </div>
    <!-- 新用户注册end -->

    <!-- 新用户福利 活动说明start -->
    <div class="detail-box">
      <h3>活动说明:</h3>
      <ul>
        <li>1.该活动仅针对新用户有效，老用户无法参与此次活动</li>
        <li>2.手机号从未注册过，方可视为一名新用户</li>
        <li>3.新用户红包有效期为15天，过期无法使用</li>
        <li>4.自新用户注册成功之日起，开始计算红包有效期</li>
        <li>5.本活动最终解释权归网易云阅读所有</li>
      </ul>
      <h4 @click="goHome">回到首页，随便看看</h4>
    </div>
    <!-- 新用户福利 活动说明end -->
  </div>
</template>


<script>
import { Indicator, Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      user: {},
      flag1: false,
      flag2: false,
      flag3: false,
      testUsername: false,
      testPassword: false,
      testUsertel: false
    };
  },
  methods: {
    FlagName() {
      // console.log(this.user.username);
      if (
        /^[a-zA-Z][a-zA-Z0-9]{3,9}$/.test(this.user.username) &&
        this.user.username != ""
      ) {
        // console.log(this.user.username);
        this.testUsername = true;
        this.flag1 = false;
      } else {
        // alert("用户名不合规范");
        this.flag1 = true;
      }
    },

    FlagPwd() {
      if (
        /^[a-zA-Z0-9]{6,16}$/g.test(this.user.password) &&
        this.user.password != ""
      ) {
        // console.log(this.user.password);
        this.flag2 = false;
        this.testPassword = true;
      } else {
        // alert("密码不合规范");
        this.flag2 = true;
      }
    },

    FlagTel() {
      if (
        /^1[3-9][0-9]{9}$/g.test(this.user.usertel) &&
        this.user.usertel != ""
      ) {
        // console.log(this.user.usertel);
        this.flag3 = false;
        this.testUsertel = true;
      } else {
        // alert("手机号不合规范");
        this.flag3 = true;
      }
    },

    gotoRegister() {
      this.flag1 = true;
      this.flag2 = true;
      this.flag3 = true;

      if (this.testUsername && this.testPassword && this.testUsertel) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = false;
        this.$http
          .post("http://localhost:1810/vue/register", this.user, {
            params: {
              username: this.user.username,
              password: this.user.password,
              usertel: this.user.usertel
            }
          })
          .then(res => {
            // console.log(res);
            this.$nextTick(() => {
              if (res.body.result.type == 1) {
                // alert(res.body.result.msg);
                MessageBox("提示", "恭喜你，注册成功");
                this.$router.push({ name: "login" });
              } else {
                alert(res.body.result.msg);
              }
            });
          });
      } else {
        alert("注册失败，请注意红色提示文字");
      }
    },
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    goHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>



<style lang="scss" scoped>
.reg-ad-img {
  width: 100%;
  height: 4.8rem;
  img {
    width: 100%;
    height: 100%;
  }
}

.register-box {
  .fuli-box {
    display: flex;
    justify-content: space-around;
    p {
      width: 30%;
      text-align: center;
      margin: 0.2rem 1% 0 1%;
      font-size: 0.2rem;
      color: #666;
      span {
        color: #ff5757;
      }
    }
  }
  label {
    display: block;
    position: relative;
    input {
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
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      color: #333;
    }
    span {
      position: absolute;
      left: 1rem;
      top: 1rem;
      display: block;
      color: #ff5757;
      font-size: 0.2rem;
    }
  }
}

.register-box button {
  display: block;
  outline: none;
  border: none;
  box-shadow: none;
  width: 80%;
  height: 1rem;
  border-radius: 1rem;
  padding: 0.1rem 0.4rem;
  box-sizing: border-box;
  margin-left: 10%;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  background-color: #f86a6a;
  color: #fff;
  font-size: 0.3rem;
}

.detail-box {
  margin: 0.3rem;
  padding-top: 0.1rem;
  h3 {
    font-size: 0.24rem;
    color: #ff5757;
  }
  li {
    font-size: 0.26rem;
    margin: 0.15rem;
    color: #777;
  }
  h4 {
    font-size: 0.24rem;
    color: #1952ee;
  }
}
</style>
