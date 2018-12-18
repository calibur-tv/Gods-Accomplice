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

        .tip {
          span {
            font-size: 13px;
            color: #797989;
          }

          img {
            width: 20px;
            height: 20px;
            margin-left: -5px;
          }
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
  <div id="post-show" class="container">
    <!-- 头部 -->
    <header v-if="post">
      <!-- 用户 -->
      <FlowHeaderUser
        v-if="user"
        :user="user"
        :is-followed="false"
        :time="post.created_at"
      />
      <!-- 标题 -->
      <div class="title">{{ post.title }}</div>
    </header>
    <!-- 正文 -->
    <main>
      <section class="content" v-html="post.content" />
      <section v-if="post.images.length" class="images">
        <VImg
          v-for="(item, index) in post.images"
          :key="index"
          :src="item.url"
          :width="item.width"
          :height="item.height"
          :mime="item.type"
          :blur="true"
          :full="true"
          class="image"
        />
      </section>
    </main>
    <!-- 番剧 -->
    <footer>
      <div class="tag-wrap">
        <BubbleTag v-if="bangumi" :text="bangumi.name">
          <img slot="icon" src="../../../images/bangumi-icon.png" />
        </BubbleTag>
        <template v-if="post && post.tags.length">
          <BubbleTag
            v-for="item in post.tags"
            :key="item.id"
            :text="item.name"
          />
        </template>
      </div>
      <div v-if="post.is_creator" class="reward-wrap">
        <div class="reward-users">
          <template v-if="!post.reward_users.total">
            <div class="avatars">
              <VImg
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
          <p v-else class="tip">
            <span>这是你唯一表达喜欢的方式</span>
            <img src="../../../images/to-reward.png" />
          </p>
        </div>
        <RewardBtn
          :id="user.id"
          :rewarded="post.rewarded"
          type="user"
          text="投食楼主"
        />
      </div>
    </footer>
    <VLazy>
      <CommentMain :id="post.id" :master-id="user.id" type="post" />
    </VLazy>
  </div>
</template>

<script>
import RewardBtn from '@/components/RewardBtn'
import BubbleTag from '@/components/BubbleTag'
import CommentMain from '@/components/comment/CommentMain'
import FlowHeaderUser from '@/components/FlowHeaderUser'

export default {
  name: 'App',
  components: {
    BubbleTag,
    CommentMain,
    RewardBtn,
    FlowHeaderUser
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
