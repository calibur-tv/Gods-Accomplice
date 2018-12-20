<style lang="scss">
.flow-reward-panel {
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
    background-color: $color-line;
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
      color: $color-red;
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
</style>

<template>
  <div class="flow-reward-panel">
    <div class="reward-users">
      <template v-if="rewardUsers.total">
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
        <span class="count">{{ rewardUsers.total }}</span>
        <span class="tail">人投食</span>
      </template>
      <p v-else class="tip">
        <span>这是你唯一表达喜欢的方式</span>
        <img src="../images/to-reward.png" />
      </p>
    </div>
    <RewardBtn
      :id="id"
      :type="type"
      :rewarded="rewarded"
      :text="text"
      @reward="$emit('reward')"
    />
  </div>
</template>

<script>
import RewardBtn from '@/components/RewardBtn'

export default {
  name: 'FlowRewardPanel',
  components: {
    RewardBtn
  },
  props: {
    rewardUsers: {
      type: Object,
      required: true
    },
    rewarded: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    type: {
      required: true,
      type: String
    },
    text: {
      type: String,
      default: '向TA投食'
    }
  },
  computed: {
    displayRewardUsers() {
      if (!this.rewardUsers.total) {
        return []
      }
      return this.rewardUsers.list.slice(0, 4)
    }
  }
}
</script>
