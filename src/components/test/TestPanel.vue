<style lang="scss">
#test-panel {
  ul {
    margin-top: 10px;
    margin-bottom: 10px;

    li {
      margin-left: 2em;
      list-style-type: disc;
      font-size: 12px;
    }
  }

  h3 {
    padding-left: 10px;
    border-left: 3px solid $color-red;
    margin-bottom: 15px;
    margin-top: 15px;
    font-size: 14px;
  }

  button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
    border: 1px solid $color-avatar-border;
    text-align: center;
    padding-bottom: 5px;
    padding-top: 5px;
  }
}
</style>

<template>
  <div id="test-panel">
    <h3>meta 注入信息：</h3>
    <ul>
      <li>
        <p>appVersion：{{ appVersion }}</p>
      </li>
      <li>
        <p>appName：{{ appName }}</p>
      </li>
      <li>
        <p>userToken：{{ token }}</p>
      </li>
    </ul>
    <h3>跳转到另一个页面</h3>
    <div>
      <button @click="$alias.post(1)">帖子</button>
      <button @click="$alias.image(1)">相册</button>
      <button @click="$alias.review(1)">漫评</button>
      <button @click="$alias.user('bing-yu')">用户</button>
      <button @click="$alias.bangumi(834)">番剧</button>
      <button @click="$alias.video(1)">视频</button>
      <button @click="$alias.notice()">系统公告</button>
      <button @click="$alias.bookmark()">我的收藏</button>
      <button @click="$alias.transaction()">交易记录</button>
      <button @click="$alias.notification()">消息通知</button>
    </div>
    <h3>其它交互测试</h3>
    <div>
      <button @click="testGetUserInfo">[getUserInfo]：获取当前用户信息</button>
      <button @click="testUpdateUserEXP">[setUserInfo]：点击经验 + 10</button>
      <button @click="testToggleClick">[toggleClick]：测试打赏传值</button>
      <button @click="testShowConfirm">[showConfirm]：打开一个confirm</button>
      <button @click="testGetDeviceInfo">
        [getDeviceInfo]：获取当前设备信息
      </button>
      <button @click="testPreviewImages">
        [previewImages]：点击测试图片预览
      </button>
      <button @click="testReadNotification">
        [readNotification]：点击清除已读消息
      </button>
    </div>
    <h3>getUserInfo 获取当前用户</h3>
    <ul v-if="user">
      <li v-for="(value, key) in user" :key="key">
        <p>{{ key }}: {{ value }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TestPanel',
  data() {
    return {
      appVersion: document.querySelector('meta[name=app-version]').content,
      appName: document.querySelector('meta[name=app-name]').content,
      token: document.querySelector('meta[name=jwt-token]').content
        ? '有值'
        : '为空',
      user: null
    }
  },
  methods: {
    testGetUserInfo() {
      M.invoker.getUserInfo(user => (this.user = user))
      this.$toast.info('getUserInfo')
    },
    testUpdateUserEXP() {
      this.$utils.updateUserExp(10)
      M.invoker.setUserInfo(M.user)
      this.user = M.user
      this.$toast.info('setUserInfo')
    },
    testToggleClick() {
      M.invoker.toggleClick({
        type: 'reward',
        model: 'post',
        id: 1,
        result: {
          rewarded: true
        }
      })
      this.$toast.info('toggleClick')
    },
    testShowConfirm() {
      M.invoker.confirm({
        title: '测试标题',
        message:
          '测试message，会很长会很长会很长会很长会很长会很长会很长会很长会很长会很长会很长会很长会很长',
        cancelButtonText: '取消按钮',
        submitButtonText: '确认按钮',
        callback: () => {
          this.$toast.success('点了确认才会走到的回调')
        }
      })
      this.$toast.info('confirm')
    },
    testGetDeviceInfo() {
      M.invoker.getDeviceInfo(data => {
        this.$toast.info(JSON.stringify(data))
      })
      this.$toast.info('getDeviceInfo')
    },
    testPreviewImages() {
      M.invoker.previewImages({
        index: 0,
        images: [
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270094418.caliburImage3333.jpg',
            width: 690,
            height: 431,
            size: 102895,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270099020.caliburImage1084.jpg',
            width: 660,
            height: 562,
            size: 111603,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270097753.caliburImage4338.jpg',
            width: 690,
            height: 431,
            size: 104498,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270101918.caliburImage6578.jpg',
            width: 558,
            height: 370,
            size: 56096,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270106236.caliburImage5884.jpg',
            width: 580,
            height: 844,
            size: 94938,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270098733.caliburImage3040.jpg',
            width: 690,
            height: 392,
            size: 86337,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270106102.caliburImage6314.jpg',
            width: 690,
            height: 455,
            size: 84685,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270100347.caliburImage8733.jpg',
            width: 690,
            height: 415,
            size: 75829,
            type: 'image/jpeg'
          },
          {
            url:
              'https://image.calibur.tv/user/33224/avatar/1542270100563.caliburImage3572.jpg',
            width: 690,
            height: 403,
            size: 87464,
            type: 'image/jpeg'
          }
        ]
      })
      this.$toast.info('previewImages')
    },
    testReadNotification() {
      M.invoker.readNotification({
        count: 1
      })
      this.$toast.info('readNotification')
    }
  }
}
</script>
