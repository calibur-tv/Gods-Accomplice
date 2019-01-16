<style lang="scss">
#json-editor-container {
  width: 100%;
  background-color: RGB(241, 243, 244);

  .flip-list-move {
    transition: transform 0.5s;
  }

  .sortable {
    &-chosen {
      opacity: 1;

      .create-btn-wrap {
        opacity: 0;
      }
    }

    &-ghost {
      opacity: 0;
    }
  }

  .last-create-btn {
    padding-bottom: 165px;
  }
}
</style>

<template>
  <div id="json-editor-container">
    <Draggable v-model="content" :options="options">
      <Component
        :is="`${item.type}-item`"
        v-for="(item, index) in content"
        :key="item.id"
        :index="index"
        :item="item"
        class="flip-list-item"
      />
    </Draggable>
    <StatsComponent
      :once="false"
      @enter="handleCreateBtnEnter"
      @leave="handleCreateBtnLeave"
    >
      <CreateBtn
        v-model="showCreatePopover"
        class="last-create-btn"
        @create="createNewSection"
      />
    </StatsComponent>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import TxtItem from './items/TxtItem.vue'
import ImgItem from './items/ImgItem.vue'
import UseItem from './items/UseItem.vue'
import ListItem from './items/ListItem.vue'
import TitleItem from './items/TitleItem.vue'
import './font.css'
import CreateBtn from './CreateBtn.vue'
import StatsComponent from '@/components/StatsComponent'

export default {
  name: 'JsonEditor',
  components: {
    StatsComponent,
    CreateBtn,
    Draggable,
    TitleItem,
    TxtItem,
    ImgItem,
    UseItem,
    ListItem
  },
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      content: this.value.map(_ => {
        return Object.assign(_, {
          id: Math.random()
            .toString(36)
            .substring(3, 6)
        })
      }),
      showCreatePopover: false
    }
  },
  computed: {
    options() {
      return {
        delay: 500
      }
    }
  },
  watch: {
    content(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.content = val
    }
  },
  created() {
    this.$channel.$on('delete-editor-item', this.handleDelete)
    this.$channel.$on('create-editor-item', this.handleCreate)
    this.$channel.$on('edit-editor-item-poster', this.handleEditPoster)
    this.$channel.$on('edit-editor-item-text', this.handleEditText)
    this.$channel.$on('get-editor-content', this.sendEditorContent)
  },
  methods: {
    handleDelete({ id }) {
      M.invoker.confirm({
        message: '确定删除当前文章段落?',
        callback: () => {
          this.content.forEach((item, index) => {
            if (item.id === id) {
              this.content.splice(index, 1)
            }
          })
        }
      })
    },
    handleCreate({ id, type }) {
      M.invoker.createEditorSection({ id, type }, data => {
        this.content.forEach((item, index) => {
          if (item.id === id) {
            this.content.splice(index, 0, Object.assign(data, {
              id: Math.random()
                .toString(36)
                .substring(3, 6)
            }))
          }
        })
      })
    },
    createNewSection({ type }) {
      M.invoker.createEditorSection({ id: '-1-', type }, data => {
        this.content.push(Object.assign(data, {
          id: Math.random()
            .toString(36)
            .substring(3, 6)
        }))
      })
    },
    handleEditPoster({ id, type }) {
      this.content.forEach((item, index) => {
        if (item.id === id) {
          M.invoker.editEditorImageSection({ id, type, data: item }, data => {
            this.content[index] = data
          })
        }
      })
    },
    sendEditorContent() {
      M.invoker.sendEditorContent({
        content: this.content
      })
    },
    handleEditText({ id, type }) {
      this.content.forEach((item, index) => {
        if (item.id === id) {
          M.invoker.editEditorTextSection({ id, type, data: item }, data => {
            this.content[index] = data
          })
        }
      })
    },
    handleCreateBtnEnter() {
      this.showCreatePopover = true
    },
    handleCreateBtnLeave() {
      this.showCreatePopover = false
    }
  }
}
</script>
