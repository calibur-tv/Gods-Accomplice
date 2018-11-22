<style lang="scss">
#image-show {
  header {
    margin-top: 20px;

    .title {
      margin-bottom: 20px;
      color: #4c4c4c;
      font-size: 18px;
      font-weight: 800;
      line-height: 24px;

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

      .user-avatar {
        float: left;
        margin-right: 10px;
      }

      .info {
        overflow: hidden;

        time {
          font-size: 12px;
          color: $color-gray-text;
        }
      }
    }
  }

  main {
    margin-top: 15px;
    margin-left: -$container-padding;
    margin-right: -$container-padding;

    .images {
      .image {
        margin-bottom: 10px;
      }
    }
  }

  footer {
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

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
}
</style>

<template>
  <div
    id="image-show"
    class="container"
  >
    <!-- 头部 -->
    <header>
      <!-- 标题 -->
      <div class="title">
        <span class="badge creator-badge">原创</span>
        {{ name }}
      </div>
      <!-- 用户 -->
      <div
        v-if="user"
        class="user"
      >
        <user-avatar :user="user"/>
        <div class="info">
          <user-nickname
            :user="user"
            :show-owner="true"
          />
          <v-time :datetime="created_at"/>
        </div>
      </div>
    </header>
    <!-- 正文 -->
    <main>
      <section
        v-if="images.length"
        class="images"
      >
        <v-img
          v-for="(item, index) in images"
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
      <span
        v-if="bangumi"
        class="bangumi"
      >来自：{{ bangumi.name }}</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      images: [],
      bangumi: null,
      user: null,
      name: '',
      created_at: ''
    }
  }
}
</script>
