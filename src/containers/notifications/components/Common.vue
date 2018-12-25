<style lang="scss">
.noti-item {
  @extend %clearfix;
  padding-top: 12px;
  padding-left: $container-padding;

  &:active {
    background-color: $color-press-active;
  }

  .avatar {
    float: left;
    margin-right: $container-padding;
  }

  .content {
    overflow: hidden;
    padding-right: $container-padding;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      background-color: $color-line;
      transform: scaleY(0.5);
    }

    .meta {
      float: right;
      margin-left: 10px;
      margin-top: 9px;

      time {
        color: $color-text-light;
        font-size: 12px;
        line-height: 17px;
        display: block;
      }

      span {
        position: absolute;
        right: 15px;
        bottom: 20px;
        display: block;
        font-size: 13px;
        color: #fff;
        border-radius: 50%;
        background-color: $color-red;
        text-align: center;
        width: 17px;
        height: 17px;
        line-height: 17px;
        float: right;
        text-indent: -1px;
      }
    }

    .body {
      overflow: hidden;

      header {
        margin-top: 8px;
        margin-bottom: 2px;
        font-size: 16px;

        .nickname {
          color: $color-link;
          line-height: 23px;
          font-weight: 500;
        }

        .intro {
          color: $color-text-normal;
          line-height: 23px;
        }
      }

      .about {
        font-size: 13px;
        line-height: 19px;
        color: $color-text-light;
        margin-bottom: 19px;
      }
    }
  }
}
</style>

<template>
  <div class="noti-item" @click="toDetail">
    <div class="avatar">
      <UserAvatar v-if="item.user" :size="60" :user="item.user" />
      <slot v-else name="avatar" />
    </div>
    <div class="content">
      <div class="meta">
        <VTime v-model="item.created_at" />
        <span v-if="!item.checked">1</span>
      </div>
      <div class="body">
        <header>
          <span class="nickname" @click.stop="$alias.user(item.user.zone)">{{
            item.user.nickname
          }}</span>
          <span class="intro">{{ getIntroByType }}</span>
        </header>
        <p class="about oneline">
          {{ convertType }}&nbsp;{{ item.model.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/*
 case 'post-like':
 return 1;
 break;
 case 'post-reward':
 return 2;
 break;
 case 'post-mark':
 return 3;
 break;
 case 'post-comment':
 return 4;
 break;
 case 'post-reply':
 return 5;
 break;
 case 'image-like':
 return 6;
 break;
 case 'image-reward':
 return 7;
 break;
 case 'image-mark':
 return 8;
 break;
 case 'image-comment':
 return 9;
 break;
 case 'image-reply':
 return 10;
 break;
 case 'score-like':
 return 11;
 break;
 case 'score-reward':
 return 12;
 break;
 case 'score-mark':
 return 13;
 break;
 case 'score-comment':
 return 14;
 break;
 case 'score-reply':
 return 15;
 break;
 case 'video-comment':
 return 16;
 break;
 case 'video-reply':
 return 17;
 break;
 case 'post-comment-like':
 return 18;
 break;
 case 'post-reply-like':
 return 19;
 break;
 case 'image-comment-like':
 return 20;
 break;
 case 'image-reply-like':
 return 21;
 break;
 case 'score-comment-like':
 return 22;
 break;
 case 'score-reply-like':
 return 23;
 break;
 case 'video-comment-like':
 return 24;
 break;
 case 'video-reply-like':
 return 25;
 break;
 case 'question-follow':
 return 26;
 break;
 case 'question-comment':
 return 27;
 break;
 case 'question-comment-like':
 return 28;
 break;
 case 'question-reply':
 return 29;
 break;
 case 'question-reply-like':
 return 30;
 break;
 case 'question-answer':
 return 31;
 break;
 case 'answer-vote':
 return 32;
 break;
 case 'answer-like':
 return 33;
 break;
 case 'answer-reward':
 return 34;
 break;
 case 'answer-mark':
 return 35;
 break;
 case 'answer-comment':
 return 36;
 break;
 case 'answer-reply':
 return 37;
 break;
 case 'answer-comment-like':
 return 38;
 break;
 case 'answer-reply-like':
 return 39;
 break;
 case 'video-reward':
 return 40;
 break;
 case 'video-like':
 return 41;
 break;
 case 'seed-coin-for-user':
 return 42;
 break;
 case 'seed-coin-for-manager':
 return 43;
 break;
 default:
 return 0;
 break;
 */
import Api from '@/api/v1/selfApi'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    getIntroByType() {
      return [
        '',
        '喜欢了你的帖子',
        '投食了你的帖子',
        '收藏了你的帖子',
        '评论了你的帖子',
        '回复了你的评论',
        '喜欢了你的相册',
        '投食了你的相册',
        '收藏了你的相册',
        '评论了你的相册',
        '回复了你的评论',
        '喜欢了你的漫评',
        '投食了你的漫评',
        '收藏了你的漫评',
        '评论了你的漫评',
        '回复了你的评论',
        '评论了你的视频',
        '回复了你的评论',
        '赞了你的评论',
        '赞了你的回复',
        '赞了你的评论',
        '赞了你的回复',
        '赞了你的评论',
        '赞了你的回复',
        '赞了你的评论',
        '赞了你的回复',
        '关注了你的提问',
        '评论了你的提问',
        '赞了你的评论',
        '回复了的评论',
        '赞了你的回复',
        '回答了你的提问',
        '赞同了你的回答',
        '喜欢了你的回答',
        '投食了你的回答',
        '收藏了你的回答',
        '评论了你的回答',
        '回复了你的评论',
        '赞了你的评论',
        '赞了你的回复',
        '投食了你的视频',
        '喜欢了你的视频',
        '每日活跃用户团子奖励',
        '每日活跃版主团子奖励'
      ][this.item.type]
    },
    convertType() {
      const type = this.item.type
      if (~[1, 2, 3, 4, 5, 18, 19].indexOf(type)) {
        return '原贴'
      }
      if (~[6, 7, 8, 9, 10, 20, 21].indexOf(type)) {
        return '相册'
      }
      if (~[11, 12, 13, 14, 15, 22, 23].indexOf(type)) {
        return '漫评'
      }
      if (~[16, 17, 24, 25, 40, 41].indexOf(type)) {
        return '视频'
      }
      if (~[26, 27, 28, 29, 30, 31].indexOf(type)) {
        return '提问'
      }
      if (~[32, 33, 34, 35, 36, 37, 38, 39].indexOf(type)) {
        return '回答'
      }
      return '提醒'
    },
    getSchemeLink() {
      const modelId = this.item.model.id
      const { type, link } = this.item
      let commentId = 0
      let replyId = 0
      if (/comment-id=/.test(link)) {
        const query = link.split('?')[1]
        if (/reply-id=/.test(query)) {
          const args = query.split('&')
          commentId = +args[0].split('=')[1]
          replyId = +args[1].split('=')[1]
        } else {
          commentId = +query.split('=')[1]
        }
      }
      if (~[1, 2, 3].indexOf(type)) {
        return {
          name: 'post',
          params: modelId
        }
      }
      if (~[4, 5, 18, 19].indexOf(type)) {
        return {
          name: 'comment',
          params: {
            type: 'post',
            comment_id: commentId,
            reply_id: replyId
          }
        }
      }
      if (~[6, 7, 8].indexOf(type)) {
        return {
          name: 'image',
          params: modelId
        }
      }
      if (~[9, 10, 20, 21].indexOf(type)) {
        return {
          name: 'comment',
          params: {
            type: 'image',
            comment_id: commentId,
            reply_id: replyId
          }
        }
      }
      if (~[11, 12, 13].indexOf(type)) {
        return {
          name: 'review',
          params: modelId
        }
      }
      if (~[14, 15, 22, 23].indexOf(type)) {
        return {
          name: 'comment',
          params: {
            type: 'review',
            comment_id: commentId,
            reply_id: replyId
          }
        }
      }
      if (~[17, 40, 41].indexOf(type)) {
        return {
          name: 'video',
          params: modelId
        }
      }
      if (~[24, 25].indexOf(type)) {
        return {
          name: 'comment',
          params: {
            type: 'video',
            comment_id: commentId,
            reply_id: replyId
          }
        }
      }
      if (~[26].indexOf(type)) {
        return {
          name: 'question',
          params: modelId
        }
      }
      if (~[27, 28, 29, 30].indexOf(type)) {
        return {
          name: 'comment',
          params: {
            type: 'question',
            comment_id: commentId,
            reply_id: replyId
          }
        }
      }
      if (~[31, 32, 33, 34, 35].indexOf(type)) {
        return {
          name: 'answer',
          params: modelId
        }
      }
      if (~[36, 37, 38, 39].indexOf(type)) {
        return {
          name: 'comment',
          params: {
            type: 'question',
            comment_id: commentId,
            reply_id: replyId
          }
        }
      }

      return null
    }
  },
  methods: {
    toDetail() {
      if (!this.item.checked) {
        const api = new Api()
        api.readMessage(this.item.id)
        this.$emit('read', this.item.id)
      }
      const urlParams = this.getSchemeLink
      if (urlParams) {
        this.$alias[urlParams.name](urlParams.params)
      }
    }
  }
}
</script>
