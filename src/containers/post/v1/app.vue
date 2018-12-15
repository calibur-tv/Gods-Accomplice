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
      margin-bottom: 20px;
      height: 25px;
      overflow: hidden;
      font-size: 0;
    }

    .reward-wrap {
      position: relative;
      height: 75px;
      padding-top: 15px;
      padding-bottom: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

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

      .reward-users {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .avatars {
          margin-right: 8px;
          margin-left: 12px;

          .avatar {
            border: 3px solid #fff;
            margin-left: -15px;
            border-radius: 50%;
          }
        }

        .count {
          font-size: 15px;
          color: #ff6881;
          margin-right: 3px;
        }

        .tail {
          color: #797989;
          font-size: 13px;
        }

        p {
          font-size: 13px;
          color: #797989;
        }
      }

      button {
        margin-left: 10px;
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
        <bubble-tag
          v-if="bangumi"
          :text="bangumi.name"
        />
        <template v-if="post && post.tags.length">
          <bubble-tag
            v-for="item in post.tags"
            :key="item.id"
            :text="item.name"
          />
        </template>
      </div>
      <div
        v-if="post.is_creator"
        class="reward-wrap"
      >
        <div class="reward-users">
          <template v-if="!post.reward_users.total">
            <div class="avatars">
              <v-img
                v-for="item in displayRewardUsers"
                :key="item.id"
                :src="item.avatar"
                :width="30"
                :height="30"
                class="avatar"
              />
            </div>
            <span class="count">{{ post.reward_users.total }}</span>
            <span class="tail">人投食</span>
          </template>
          <p v-else>这是你唯一表达喜欢的方式</p>
        </div>
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
import BubbleTag from '@/components/BubbleTag'

export default {
  name: 'App',
  components: {
    UserFollowBtn,
    BubbleTag,
    RewardBtn
  },
  data() {
    return {
      post: null,
      bangumi: null,
      user: null
    }
  },
  computed: {
    displayRewardUsers() {
      if (!this.post.reward_users.total) {
        return []
      }
      return this.post.reward_users.list.slice(0, 4)
    }
  }
}
</script>
