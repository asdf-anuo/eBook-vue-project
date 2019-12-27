<template>
  <div>
    <Head title="书籍详情" :show="true"></Head>

    <div class="book-info">
      <div class="book-img">
        <img :src="book.iconUrl" alt="image" title="正在加载图片" />
      </div>
      <div class="detail">
        <h2>{{book.title}}</h2>
        <p>作者：{{book.author}}</p>
        <p>分类：{{book.category}}</p>
        <p>字数：{{book.showTotalCount}}</p>
        <p>阅读量：{{book.readCount}}</p>
      </div>
    </div>

    <div class="whatTodo">
      <button @click="readnow">
        <i class="icon iconfont icon-shuben2"></i> 立即阅读
      </button>
      <button @click="saveToMybooklist(book)">
        <i class="icon iconfont icon-shoucang1"></i> 收藏到我的书架
      </button>
    </div>
    <div class="book-content">
      <h3>内容简介</h3>
      <p>{{book.description}}</p>
    </div>

    <div class="hot-comments">
      <h3 class="saysomething">
        我也要评论
        <i class="icon iconfont icon-pingjia1"></i>
      </h3>
      <div class="addmsg">
        <textarea v-model="mycomment" placeholder="这本书怎么样?你也来说一句呗~"></textarea>
        <input type="button" value="提交" @click="addComment()" />
      </div>
    </div>

    <div class="hot-comments">
      <h3>
        精彩评论
        <span>(共{{comments.length}}条)</span>
        <span class="saysomething" @click="readAllComments">查看所有评论</span>
      </h3>
    </div>

    <!-- 读者评论详情start -->
    <div v-if="this.comments.length>0" class="comments">
      <div class="reader-img"></div>
      <div class="comments-info">
        <p>
          <span class="reader-id">{{comments.username}}</span>
          <span class="reader-time">{{comments.time}}</span>
        </p>
        <p>
          <span class="reader-words">{{comments.content}}</span>
        </p>
        <p>
          <span class="reply">
            <i class="icon iconfont icon-xiaoxi"></i>回复
          </span>
          <span class="zan">
            <i class="icon iconfont icon-zuji1"></i>
            {{comments.like}}
          </span>
        </p>
      </div>
    </div>
    <div v-else>暂无评论哦</div>
    <!-- 读者评论详情end -->
  </div>
</template>


<script>
import { Indicator, Toast, MessageBox } from "mint-ui";
import store from "../vuex/store";
export default {
  data() {
    return {
      flag: true,
      book: {},
      mycomment: "",
      comments: store.state.comments,
      username: store.state.username
    };
  },
  created() {
    this.getInitData();
  },
  computed: {
    booknum() {
      return this.$store.state.booknum;
    }
  },
  methods: {
    getInitData() {
      // 获取书本详细信息
      this.$http
        .get("http://localhost:1810/vue/getdetail", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(res => {
          // console.log(res);
          this.book = res.data.result;
          store.state.book = this.book;
        });

      // 获取书本的所有评论
      this.$http
        .get("http://localhost:1810/vue/getComments", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(res => {
          console.log(res);
          this.comments = res.data.result;
          store.state.comments = this.comments;
          // console.log(store.state.comments)
        });
    },
    // 立即开始阅读
    readnow() {
      MessageBox("提示", "接口未打通，正在开发中...");
    },
    // 收藏到我的书架
    saveToMybooklist(book) {
      if (this.username != "") {
        this.$http
          .get("http://localhost:1810/vue/addToMybooklist", {
            params: {
              username: store.state.username,
              id: book._id,
              title: book.title,
              iconUrl: book.iconUrl,
              readCount: book.readCount,
              showTotalCount: book.showTotalCount
            }
          })
          .then(res => {
            // console.log(res);
            if (res.body.result.type == 1) {
              MessageBox(
                "收藏成功",
                "《" + book.title + "》已被收藏到你的书架!"
              );
              this.$store.dispatch("changeBooknum");
            } else {
              MessageBox("收藏失败", "本书已被你收藏过了哦");
            }
          });
      } else {
        MessageBox("提示", "您还未登陆，请登录!");
        this.$router.push({ name: "login" });
      }
    },
    // 添加我的评论
    addComment() {
      var date = new Date();
      var year = date.getFullYear(); //getFullYear
      var month = date.getMonth() + 1; //
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      var time =
        year +
        "/" +
        (month > 10 ? month : "0" + month) +
        "/" +
        (day > 10 ? day : "0" + day) +
        " " +
        (hour > 10 ? hour : "0" + hour) +
        ":" +
        (min > 10 ? min : "0" + min) +
        ":" +
        (sec > 10 ? sec : "0" + sec);
      // console.log("bookid:" + this.book._id);
      // console.log("留言内容:" + this.mycomment);
      // console.log("留言时间:" + time);

      if (this.username != "") {
        if (this.mycomment && this.mycomment != undefined) {
          this.$http
            .get("http://localhost:1810/vue/addcomment", {
              params: {
                username: store.state.username,
                bookid: this.book._id,
                content: this.mycomment,
                time: time
              }
            })
            .then(res => {
              console.log(res.data.result.ops);
              if (res.data.code == 200) {
                this.mycomment = "";
                MessageBox("提示", "评论成功!");
              } else {
                MessageBox("提示", "评论失败");
              }
            });
        } else {
          MessageBox("提示", "评论内容不能为空哦!");
        }
      } else {
        MessageBox("提示", "您还未登陆，请先登录!");
        this.$router.push({ name: "login" });
      }
    },
    // 查看所有评论
    readAllComments() {
      console.log("查看本书所有留言");
    }
  }
};
</script>

<style lang="scss" scoped>
// 我要留言
.addmsg {
  width: 90%;
  margin-left: 4%;
  textarea {
    width: 100%;
    height: 1.2rem;
    border-radius: 0.1rem;
    padding: 0.1rem;
    font-size: 0.22rem;
  }
  input {
    outline: none;
    border: none;
    box-shadow: none;
    background: #ff7575;
    width: 15%;
    height: 0.6rem;
    font-size: 0.22rem;
    color: #fff;
    border-radius: 0.1rem;
    box-sizing: border-box;
  }
}
// 读者评论
.comments {
  margin: 0.3rem;
  overflow: hidden;
  .reader-img {
    width: 0.8rem;
    height: 0.8rem;
    background-color: rgb(231, 73, 53);
    border-radius: 50%;
    float: left;
  }
  .comments-info {
    width: 80%;
    margin-left: 0.4rem;
    float: left;
    color: #666;
    p {
      line-height: 0.4rem;
      margin-top: 0.1rem;
      display: flex;
      justify-content: space-between;
      .reader-id,
      .reply {
        font-size: 0.28rem;
        color: rgb(99, 159, 249);
        i {
          font-size: 0.24rem;
        }
      }
      .reader-time,
      .zan {
        font-size: 0.24rem;
        i {
          font-size: 0.3rem;
        }
      }
      .reader-words {
        font-size: 0.26rem;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}

// 书籍详细信息
.book-info {
  margin: 0.3rem;
  overflow: hidden;
  .book-img {
    width: 35%;
    float: left;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .detail {
    margin-left: 10%;
    width: 55%;
    float: right;
    h2 {
      line-height: 1rem;
      color: #111;
      font-size: 0.34rem;
      letter-spacing: 0.01rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      line-height: 0.42rem;
      color: #999;
      font-size: 0.24rem;
    }
  }
}
.whatTodo {
  width: 100%;
  display: flex;
  button {
    outline: none;
    border: none;
    box-shadow: none;
    background: #ff7575;
    width: 48%;
    height: 0.7rem;
    border-radius: 0.7rem;
    margin: 0 1%;
    font-size: 0.26rem;
    box-sizing: border-box;
    color: #fff;
    i {
      font-size: 0.26rem;
    }
  }
}

// 内容简介
.book-content {
  width: 100%;
  border-bottom: 1px solid #ccc;
  h3 {
    margin: 0.4rem 0.3rem 0.1rem;
    line-height: 0.6rem;
    font-size: 0.34rem;
  }
  p {
    margin: 0.1rem 0.3rem 0.4rem;
    line-height: 0.4rem;
    font-size: 0.24rem;
    text-indent: 0.4rem;
    color: #999;
  }
}

//saysomething

.hot-comments {
  width: 100%;
  h3 {
    margin: 0.4rem 0.3rem 0.1rem;
    line-height: 0.6rem;
    font-size: 0.34rem;
    position: relative;
    span {
      font-size: 0.2rem;
      color: #999;
    }
    .saysomething {
      position: absolute;
      top: 0;
      right: 0;
      color: rgb(99, 159, 249);
      i {
        font-size: 0.24rem;
      }
    }
  }
}
</style>

