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
        margin-right: 20px;
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
        overflow: hidden;
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
        margin-top: $container-padding;
        margin-left: 9px;
        margin-right: 9px;
        width: 55px;
        height: 93px;
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

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
              <p>{{ data.trending || '无' }}</p>
              <span>排名</span>
            </div>
            <div class="item">
              <p>{{ $utils.shortenNumber(data.fans_count) }}</p>
              <span>粉丝</span>
            </div>
            <div class="item">
              <p>{{ $utils.shortenNumber(data.star_count) }}</p>
              <span>团子</span>
            </div>
          </div>
          <button @click="handleStar">
            {{ data.hasStar ? '已应援×' + data.hasStar : '投食应援' }}
          </button>
        </div>
      </div>
    </header>
    <BangumiPanel :bangumi="bangumi" />
    <div class="hr" />
    <main class="container">
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
      <div class="panel">
        <h3>守护者</h3>
        <div v-if="data.lover">
          <div class="lover">
            <div class="avatar">
              <UserAvatar :user="data.lover" :size="55" />
            </div>
            <div class="content"><UserNickname :user="data.lover" /></div>
          </div>
        </div>
        <p v-else class="no-one">暂无守护者</p>
      </div>
      <div class="panel">
        <h3>
          应援团
          <Switcher :list="['最多应援', '最新应援']" @click="switchFansSort" />
        </h3>
        <ul v-if="data.fans_count" class="fans-list">
          <li v-for="item in fans" :key="item.id" class="fans">
            <UserAvatar :user="item" :size="55" />
            <p class="nickname">{{ item.nickname }}</p>
          </li>
        </ul>
        <Loadmore
          :no-more="noMore"
          :nothing="!data.fans_count"
          :error="error"
          :loading="loading"
          :fetch="loadFansList"
        >
          <p slot="nothing" class="no-one">TA还没有真正的粉丝~</p>
        </Loadmore>
      </div>
    </main>
  </div>
</template>

<script>
import BangumiPanel from '@/components/BangumiPanel'
import Loadmore from '@/components/Loadmore'
import Switcher from '@/components/Switcher'
import Api from '@/api/v1/cartoonRoleApi'

export default {
  name: 'App',
  components: {
    BangumiPanel,
    Loadmore,
    Switcher
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
      userCoinTotal: M.user.coin || 0
    }
  },
  created() {
    document.title = this.data.name
  },
  methods: {
    async loadFansList() {
      if (this.loading || this.noMore) {
        return
      }
      this.loading = true
      const api = new Api()
      try {
        const data = await api.fans({
          roleId: this.data.id,
          seenIds: this.fans.map(_ => _.id).toString(),
          minId: this.fans.length ? this.fans[this.fans.length - 1].id : 0,
          sort: this.fansSort
        })
        this.fans = this.fans.concat(data.list)
        this.noMore = data.noMore
      } catch (e) {
        this.$toast.error(e)
        this.error = true
      } finally {
        this.loading = false
      }
    },
    switchFansSort() {
      if (this.loading) {
        return
      }
      this.fansSort = this.fansSort === 'hot' ? 'new' : 'hot'
      this.fans = []
      this.noMore = false
      this.error = false
      this.loadFansList()
    },
    handleStar() {
      if (!this.userCoinTotal) {
        this.$toast.info('没有团子了~')
        return
      }
      this.userCoinTotal--
      const api = new Api()
      api.star({
        roleId: this.data.id
      })
      if (!this.data.hasStar) {
        this.data.fans_count++
      }
      this.data.hasStar++
      this.$toast.info(`+${this.data.hasStar}s`)
    }
  }
}
</script>
