<style lang="scss">
#home {
  background-color: transparent;

  .panel {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 150px;
    padding: 15px $container-padding 0;
    background-color: #fff;

    header {
      margin-bottom: 18px;
      @extend %clearfix;

      .avatar {
        width: 65px;
        height: 65px;
        display: block;
        float: left;
        border-radius: 50%;
        margin-right: 14px;
      }

      .content {
        overflow: hidden;

        .nickname-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          line-height: 37px;
          margin-top: 5px;

          .nickname {
            overflow: hidden;
            margin-right: 6px;
            color: $color-text-normal;
            font-size: 23px;
            font-weight: 500;
          }

          .badge {
            flex-shrink: 0;
          }

          .level {
            height: 32px;
            padding: 0 18px;
            color: #fff;
            background-color: #ffc83f;
            border-radius: 16px;
            @include half-font(11px);
            line-height: 32px;
            margin-right: -30px;
          }
        }

        .intro {
          color: $color-text-light;
          font-size: 13px;
          line-height: 18px;
        }
      }

      .link {
        float: right;
        width: 20px;
        height: 20px;
        margin-top: 23px;
      }
    }

    main {
      @extend %clearfix;

      button {
        float: right;
        margin-left: 10px;
      }

      .meta {
        overflow: hidden;

        .item {
          width: 30%;
          float: left;

          &:not(:last-child) {
            margin-right: 5%;
          }

          p {
            color: $color-text-normal;
            font-size: 18px;
            line-height: 20px;
            font-weight: 500;
          }

          span {
            font-size: 13px;
            color: #797989;
          }
        }
      }
    }
  }

  .shim {
    height: 150px;
    width: 100%;
    background-color: #fff;
  }

  .hr {
    height: 10px;
    background-color: $color-background;
  }

  .main-menu {
    padding-bottom: 30px;

    .item {
      @extend %clearfix;
      height: 45px;
      margin-top: 8px;
      margin-bottom: 2px;
      padding-left: $container-padding;
      padding-right: $container-padding;
      padding-bottom: 10px;
      padding-top: 10px;

      .icon {
        width: 25px;
        height: 25px;
        margin-right: 8px;
        float: left;
      }

      .text {
        color: $color-text-normal;
        font-size: 16px;
        overflow: hidden;
        line-height: 25px;
      }

      .tail {
        height: 25px;
        float: right;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: 5px;

        img {
          width: 20px;
          height: 20px;
        }

        span {
          color: $color-text-light;
          font-size: 12px;
          margin-right: 5px;
        }
      }

      &:active {
        background-color: $color-press-active;
      }
    }
  }
}
</style>

<template>
  <div id="home">
    <div class="panel">
      <header @click="$alias.user(zone)">
        <img :src="$resize(avatar, { width: 130 })" class="avatar" />
        <img src="../icon/link.png" class="link" />
        <div class="content">
          <div class="nickname-wrap">
            <div class="nickname"><p class="oneline" v-text="nickname" /></div>
            <div class="badge level">LV{{ exp.level }}</div>
          </div>
          <p class="intro">查看或编辑资料</p>
        </div>
      </header>
      <main>
        <DaySignBtn :signed="daySign" @signed="handleSigned" />
        <div class="meta">
          <div class="item">
            <p class="oneline" v-text="$utils.shortenNumber(power)" />
            <span>战斗力</span>
          </div>
          <div class="item">
            <p class="oneline" v-text="exp.level" />
            <span>等级</span>
          </div>
          <div class="item">
            <p class="oneline" v-text="$utils.shortenNumber(coin)" />
            <span>团子</span>
          </div>
        </div>
      </main>
    </div>
    <div class="shim" />
    <div class="hr" />
    <div class="main-menu">
      <div class="item">
        <img src="../icon/post.png" class="icon" />
        <div class="tail"><img src="../icon/link.png" /></div>
        <p class="text oneline">帖子</p>
      </div>
      <div class="item">
        <img src="../icon/comment.png" class="icon" />
        <div class="tail"><img src="../icon/link.png" /></div>
        <p class="text oneline">评论</p>
      </div>
      <div class="item">
        <img src="../icon/history.png" class="icon" />
        <div class="tail"><img src="../icon/link.png" /></div>
        <p class="text oneline">浏览历史</p>
      </div>
      <div class="item">
        <img src="../icon/invite.png" class="icon" />
        <div class="tail">
          <span>邀请送团子</span> <img src="../icon/link.png" />
        </div>
        <p class="text oneline">我的邀请码</p>
      </div>
      <div class="item">
        <img src="../icon/help.png" class="icon" />
        <div class="tail">
          <span>玩转C站</span> <img src="../icon/link.png" />
        </div>
        <p class="text oneline">帮助</p>
      </div>
      <div class="item">
        <img src="../icon/feedback.png" class="icon" />
        <div class="tail"><img src="../icon/link.png" /></div>
        <p class="text oneline">意见反馈</p>
      </div>
      <div class="item">
        <img src="../icon/setting.png" class="icon" />
        <div class="tail"><img src="../icon/link.png" /></div>
        <p class="text oneline">设置</p>
      </div>
    </div>
  </div>
</template>

<script>
import DaySignBtn from '@/components/DaySignBtn'

export default {
  name: 'App',
  components: {
    DaySignBtn
  },
  data() {
    return {
      id: 0,
      zone: '',
      avatar: '',
      banner: '',
      coin: 0,
      coin_from_sign: 0,
      daySign: false,
      exp: {
        have_exp: 0,
        level: 1,
        next_level_exp: 0
      },
      nickname: '',
      power: '',
      sex: 0,
      sexSecret: false,
      signature: ''
    }
  },
  methods: {
    handleSigned({ exp, message }) {
      this.daySign = true
      this.coin++
      this.$toast.success(message)
      this.$utils.updateUserExp(exp)
      const user = M.user
      this.exp = user.exp
      user.coin++
      M.invoker.setUserInfo(user)
    }
  }
}
</script>
