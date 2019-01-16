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
import { ulid } from 'ulid'
import './font.css'
import CreateBtn from './CreateBtn.vue'
import StatsComponent from '@/components/StatsComponent'

export default {
  name: 'JsonEditor',
  components: {
    StatsComponent,
    CreateBtn,
    Draggable,
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
          id: ulid()
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
      M.invoker.createEditorSection({ id, type })
    },
    createNewSection({ type }) {
      M.invoker.createEditorSection({ id: '-1', type })
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
