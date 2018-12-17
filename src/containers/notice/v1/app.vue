<style lang="scss">
#notice {
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  padding-top: 15px;
  background-color: #fafafa;

  li {
    list-style-type: none;
    margin-bottom: 12px;
    display: block;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 2px rgba(#989898, 0.2);
    background-color: #fff;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .title {
      margin: 15px 15px 9px;
      line-height: 15px;
      font-size: 15px;
      color: #333;
    }

    .meta {
      display: block;
      font-size: 12px;
      line-height: 12px;
      margin-left: 15px;
      padding-bottom: 15px;
      color: #666666;
    }
  }
}
</style>

<template>
  <ul id="notice">
    <li v-for="(item, index) in list" :key="index">
      <a>
        <img :src="item.poster" />
        <p class="title oneline" v-text="item.title" />
        <span class="meta"> 活动时间：{{ item.time }} </span>
      </a>
    </li>
  </ul>
</template>

<script>
import hangjuPoster from '@/images/hangju.jpg'
import morningMessagePoster from '@/images/morning-message.jpg'
import newbiePoster from '@/images/newbie.jpg'
import dailyWork from '@/images/daily-work.jpg'

export default {
  name: 'App',
  data() {
    return {
      list: [
        {
          url: 'https://www.jianshu.com/p/b866164607e5',
          title: '“行距杯”年度征文大赛',
          time: '2018年8月31日 - 2019年1月31日',
          poster: hangjuPoster
        },
        {
          url: 'https://www.jianshu.com/mobile/campaign/morning_diary',
          poster: morningMessagePoster,
          title: '晨间日记',
          time: '长期有效'
        },
        {
          url: 'https://www.jianshu.com/mobile/campaign/day_by_day/join',
          poster: dailyWork,
          title: '日更挑战',
          time: '长期有效'
        },
        {
          url: 'https://www.jianshu.com/p/5ede51702c42',
          poster: newbiePoster,
          title: '简书新青年栏目有偿征稿，寻找有趣有料的简书青年',
          time: '长期有效'
        }
      ]
    }
  }
}
</script>
