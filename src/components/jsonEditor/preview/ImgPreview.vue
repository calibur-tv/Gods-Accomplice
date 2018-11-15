<style lang="scss">
.image-preview {
  .body {
    .el-input {
      margin-top: 20px;
      padding: 0 30px;
    }

    .el-input__inner {
      border-top: none;
      border-left: none;
      border-right: none;
      text-align: center;
    }

    .uploader {
      margin-top: 30vh;
      text-align: center;

      .el-upload__text {
        margin-top: 5px;
      }
    }
  }

  .footer {
    text-align: center;
    line-height: 15px;
    height: 15px;
    margin-bottom: 40px;
  }
}
</style>

<template>
  <v-drawer
    v-model="show"
    from="right"
    size="100%"
    header-text="编辑图片段落"
    submit-text="确定"
  >
    <div
      v-if="show"
      class="image-preview container"
    >
      <div class="body">
        <div
          v-if="item.url"
          :style="imageWrapperHeight"
          class="wrapper"
        >
          <v-img
            :src="$resize(item.url)"
            :width="item.width"
            :height="item.height"
            :full="true"
          />
          <el-input
            v-model="desc"
            maxlength="45"
            placeholder="添加图片描述"
          />
        </div>
        <el-upload
          v-else
          :data="uploadHeaders"
          :action="imageUploadAction"
          :accept="imageUploadAccept"
          :before-upload="handleImageUploadBefore"
          :on-error="handleImageUploadError"
          :on-success="imageUploadSuccess"
          :disabled="true"
          class="uploader"
        >
          <i class="el-icon-plus"/>
          <div class="el-upload__text">点击上传</div>
        </el-upload>
      </div>
      <div class="footer">
        <el-upload
          :data="uploadHeaders"
          :action="imageUploadAction"
          :accept="imageUploadAccept"
          :show-file-list="false"
          :before-upload="handleImageUploadBefore"
          :on-error="handleImageUploadError"
          :on-success="imageUploadSuccess"
          :disabled="true"
        >
          <el-button
            v-if="item.url"
            size="small"
            plain
            round
          >更换图片</el-button>
        </el-upload>
      </div>
    </div>
  </v-drawer>
</template>

<script>
import { cdn } from "env";
import UploadMixin from "~/mixins/upload";

export default {
  name: "ImgPreview",
  mixins: [UploadMixin],
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      show: false,
      saving: false
    };
  },
  computed: {
    desc: {
      get() {
        return this.item.text;
      },
      set(value) {
        this.$store.commit("editor/UPDATE_SECTION_TEXT", { value });
      }
    },
    imageWrapperHeight() {
      return {
        height: `${(this.item.height * window.innerWidth) / this.item.width +
          60}px`
      };
    }
  },
  mounted() {
    this.$channel.$on("write-save-done", () => {
      this.saving = false;
    });
    this.$channel.$on("write-open-drawer", ({ type }) => {
      if (type === "img") {
        this.show = true;
      }
    });
    this.getUpToken();
  },
  methods: {
    imageUploadSuccess(res, file) {
      this.handleImageUploadSuccess(res, file);
      this.$store.commit("editor/UPDATE_SECTION_IMAGE", {
        url: `${cdn.image}${res.data.url}`,
        width: res.data.width,
        height: res.data.height,
        size: res.data.size,
        mime: res.data.type
      });
      this.$toast.success("上传成功");
    },
    emitSave() {
      if (!this.item.url) {
        return;
      }
      this.$channel.$emit("write-save");
      this.saving = true;
    }
  }
};
</script>
