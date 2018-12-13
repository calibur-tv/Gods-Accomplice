<style lang="scss">
#post-show {
  header {
    margin-top: 15px;

    .title {
      color: #22222b;
      font-size: 23px;
      line-height: 32px;
      font-weight: 500;

      .creator-badge {
        display: inline-block;
        background-color: orange;
        color: #fff;
        border-radius: 4px;
        font-weight: 500;
        font-size: 12px;
        padding: 0 3px;
        line-height: 17px;
        margin-top: -3px;
      }
    }

    .user {
      @extend %clearfix;
      margin-bottom: 20px;

      .user-avatar {
        float: left;
        margin-right: 10px;
      }

      button {
        float: right;
        margin-left: 10px;
        margin-top: 6px;
      }

      .info {
        height: 40px;
        overflow: hidden;

        .user-nickname {
          margin-top: 2px;
          margin-bottom: 1px;
        }

        time {
          color: #a4a4ae;
          @include half-font(10px, top);
          line-height: 28px;
        }
      }
    }
  }

  main {
    margin-top: 15px;
    margin-bottom: 20px;

    .content {
      font-size: 17px;
      line-height: 30px;
      margin-bottom: 15px;
      color: #22222b;

      p:not(:last-child) {
        margin-bottom: 30px;
      }
    }

    .images {
      .image {
        margin-bottom: 15px;
      }
    }
  }

  footer {
    .tag-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .bangumi {
        font-size: 12px;
        color: #6d757a;
        font-weight: bold;
        margin-right: 20px;
        line-height: 18px;
        flex-shrink: 0;
      }

      .tags {
        font-size: 0;
        height: 18px;
        overflow: hidden;
        text-align: right;
        @extend %breakWord;

        span {
          display: inline-block;
          padding-left: 7px;
          padding-right: 7px;
          height: 18px;
          font-size: 12px;
          border-radius: 9px;
          line-height: 18px;
          background-color: #e5e9ef;
          color: #6d757a;
          margin-left: 5px;
        }
      }
    }

    .reward-wrap {
      position: relative;
      height: 75px;
      padding-top: 15px;
      padding-bottom: 15px;

      &:before {
        content: '';
        position: absolute;
        background-color: #e5e5e5;
        top: 0;
        left: 0;
        height: 1px;
        width: 100%;
        transform: scaleY(0.5);
      }
    }
  }
}
</style>

<template>
  <div
    id="post-show"
    class="container"
  >
    <!-- 头部 -->
    <header v-if="post">
      <!-- 用户 -->
      <div
        v-if="user"
        class="user"
      >
        <user-avatar :user="user"/>
        <user-follow-btn
          :user-id="user.id"
          :followed="false"
        />
        <div class="info">
          <user-nickname :user="user"/>
          <v-time :datetime="post.created_at"/>
        </div>
      </div>
      <!-- 标题 -->
      <div class="title">
        {{ post.title }}
      </div>
    </header>
    <!-- 正文 -->
    <main>
      <section
        class="content"
        v-html="post.content"
      />
      <section
        v-if="post.images.length"
        class="images"
      >
        <v-img
          v-for="(item, index) in post.images"
          :key="index"
          :src="item.url"
          :width="item.width"
          :height="item.height"
          :full="true"
          class="image"
        />
      </section>
    </main>
    <!-- 番剧 -->
    <footer>
      <div class="tag-wrap">
        <span
          v-if="bangumi"
          class="bangumi"
        >来自：{{ bangumi.name }}</span>
        <div
          v-if="post && post.tags.length"
          class="tags"
        >
          <span
            v-for="item in post.tags"
            :key="item.id"
            v-text="item.name"
          />
        </div>
      </div>
      <div
        v-if="post.is_creator"
        class="reward-wrap"
      >
        <reward-btn
          :id="user.id"
          :rewarded="post.rewarded"
          type="user"
          text="投食楼主"
        />
      </div>
    </footer>
  </div>
</template>

<script>
import UserFollowBtn from '@/components/UserFollowBtn'
import RewardBtn from '@/components/RewardBtn'

export default {
  name: 'App',
  components: {
    UserFollowBtn,
    RewardBtn
  },
  data() {
    return {
      post: null,
      bangumi: null,
      user: null
    }
  }
}
</script>
