<style lang="scss">
#role-show {
  header {
    position: relative;
    height: 160px;
    overflow: hidden;

    .bg {
      position: absolute;
      left: -10%;
      top: -10%;
      width: 120%;
      height: 120%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      filter: blur(20px);
      z-index: -1;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        opacity: 0.1;
      }
    }

    .container {
      margin-top: 33px;
      height: 128px;

      .avatar {
        float: left;
        margin-right: 10px;
        margin-left: -5px;
      }

      .content {
        overflow: hidden;
        padding-top: 3px;

        .meta {
          color: #fff;
          font-size: 0;
          margin-bottom: 15px;

          .item {
            display: inline-block;
            width: 33.3%;
            text-align: left;

            p {
              font-size: 22px;
              line-height: 22px;
              margin-bottom: 2px;
              font-weight: bold;
            }

            span {
              font-size: 13px;
              line-height: 19px;
            }
          }
        }

        button {
          width: 100%;
          height: 36px;
          line-height: 36px;
          border-radius: 18px;
          background-color: $color-red;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-align: center;

          &:active {
            background-color: rgba($color-red, 0.9);
          }
        }
      }
    }
  }

  .hr {
    height: 10px;
    background-color: $color-background-container;
  }

  main {
    .panel {
      position: relative;
      margin-top: $container-padding;
      padding-bottom: $container-padding;

      &:not(:last-child) {
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          transform: scaleY(0.5);
          background-color: $color-line;
        }
      }

      h3 {
        color: $color-text-normal;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        margin-bottom: 10px;

        .switcher {
          float: right;
          margin-top: -2px;
        }
      }
    }

    .intro {
      margin-top: -6px;

      p {
        color: $color-text-gray;
        line-height: 20px;
        font-size: 14px;
      }

      button {
        color: $color-link;
        margin-top: 4px;
        font-size: 14px;
        line-height: 20px;
      }

      .twoline {
        @include mutiline(20px);
      }
    }

    .lover {
      @extend %clearfix;

      .avatar {
        float: left;
        margin-right: 10px;
      }

      .content {
        margin-top: 5px;
        overflow: hidden;

        .score {
          color: $color-red;
          font-size: 14px;
          margin-top: 3px;
        }
      }
    }

    .no-one {
      color: $color-text-gray;
      line-height: 20px;
      font-size: 14px;
      text-align: left;
    }

    .fans-list {
      font-size: 0;
      margin-left: -9px;
      margin-right: -9px;

      .fans {
        position: relative;
        margin-top: $container-padding;
        margin-left: 9px;
        margin-right: 9px;
        width: 55px;
        height: 93px;
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .score {
          position: absolute;
          right: 2px;
          top: 33px;
          padding: 4px 10px;
          background-color: $color-red;
          color: #fff;
          @include half-font(10px);
          transform-origin: right center;
          border-radius: 14px;
        }

        .nickname {
          @include mutiline(19px);
          font-size: 13px;
          color: #484853;
          text-align: center;
          height: 38px;
          width: 100%;
        }
      }
    }

    .copy-btn {
      background-color: #f25d8e;
      box-shadow: 0 4px 4px rgba(255, 112, 159, 0.3);
      color: #fff;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 12px;
      display: block;
      width: 150px;
      margin: 10px auto 25px auto;
    }
  }
}
</style>

<template>
  <div id="role-show">
    <header>
      <div
        class="bg"
        :style="{
          backgroundImage: `url(${$resize(data.avatar, { width: 200 })})`
        }"
      />
      <div class="container">
        <div class="avatar">
          <VImg
            :src="data.avatar"
            :width="100"
            :height="100"
            :avatar="true"
            :lazy="false"
          />
        </div>
        <div class="content">
          <div class="meta">
            <div class="item">
              <p>？</p>
              <span>排名</span>
            </div>
            <div class="item">
              <p>？</p>
              <span>粉丝</span>
            </div>
            <div class="item">
              <p>？</p>
              <span>团子</span>
            </div>
          </div>
          <button>应援功能已下线</button>
        </div>
      </div>
    </header>
    <BangumiPanel :bangumi="bangumi" />
    <div class="hr" />
    <main class="container">
      <div class="panel">
        <h3>更新</h3>
        <div class="intro">
          <p>
            "初代守护者争夺战"已结束，感谢大家的参与；我们已经保存了历史数据，在将来会专门制作一个页面来纪念大家所做的贡献！
          </p>
          <p>
            现在，我们有新的「股市」系统已经在网页版上线了，期待大家为自己的爱豆贡献自己的力量，点击下方按钮复制链接，在浏览器中访问：
          </p>
        </div>
        <button
          v-clipboard="`https://m.calibur.tv/role/${data.id}`"
          class="copy-btn"
          @success="$toast.success('复制成功')"
        >
          点我复制网页链接
        </button>
        <div class="intro">
          <p>
            若复制失败，请直接打开：https://m.calibur.tv/role/{{
              data.id
            }}，马上入股
          </p>
        </div>
      </div>
      <div class="panel">
        <h3>简介</h3>
        <div v-if="collapsed" class="intro" @click="collapsed = false">
          <p class="twoline" v-text="data.intro" />
          <button>全文</button>
        </div>
        <div v-else class="intro" @click="collapsed = true">
          <p v-text="data.intro" />
          <button>收起</button>
        </div>
      </div>
    </main>
    <div class="hr" />
  </div>
</template>

<script>
import BangumiPanel from '@/components/BangumiPanel'

export default {
  name: 'App',
  components: {
    BangumiPanel
  },
  data() {
    return {
      bangumi: null,
      data: null,
      collapsed: true,
      fans: [],
      noMore: false,
      loading: false,
      error: false,
      fansSort: 'hot',
      userCoinTotal: 0,
      userId: 0
    }
  },
  created() {
    document.title = this.data.name
  },
  mounted() {},
  methods: {}
}
</script>
