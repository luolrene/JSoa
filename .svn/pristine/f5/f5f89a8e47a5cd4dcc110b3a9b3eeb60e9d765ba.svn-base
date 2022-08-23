<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="main-form-box">
    <!-- 拖拽为空时显示 -->
    <div class="null-form" v-if="configFormData.list.length === 0">
      <i class="el-icon-files null-icon"></i>
      <div>从左侧拖拽组件</div>
    </div>
    <el-form :size="configFormData.config.size" :label-position="configFormData.config.labelPosition" :label-width="configFormData.config.labelWidth + 'px'">
      <!-- 拖拽展示组件 -->
      <draggable v-model="configFormData.list" v-bind="{ group: 'people', animation: 200 }" @add="handleWidgetAdd" class="container-form" handle=".movetag">
        <!-- 循环展示拖拽的组件 -->
        <div v-for="(item, index) in configFormData.list" :key="index" class="formitem-style">
          <!-- 栅格布局 -->
          <template v-if="item.type === 'grid'">
            <el-row v-if="item && item.key" type="flex" :gutter="item.options.gutter" :justify="item.options.justify" :align="item.options.align" @click.native="handleSelectWidget(index)" class="widget-col" :class="{ active: selectWidget.key === item.key }">
              <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span ? col.span : 0">
                <draggable v-model="col.list" :no-transition-on-drag="false" v-bind="{
                    group: 'people',
                    animation: 200,
                    handle: '.drag-widget',
                  }" class="widget-col-list" @add="handleWidgetColAdd($event, item, colIndex)" handle=".drag-widget">
                  <template v-for="(el, i) in col.list">
                    <widgetformitem v-if="el && el.key" :select.sync="selectWidget" :eleItem="el" :eleIndex="i" :listdata="col"></widgetformitem>
                  </template>
                </draggable>
              </el-col>
              <!-- 删除 -->
              <div class="widget-col-action" v-if="selectWidget.key === item.key">
                <el-tag class="grid-tag" effect="dark" @click="removeWidgetElement(index)">
                  <i class="el-icon-delete"></i>
                </el-tag>
                <el-tag effect="dark" class="grid-tag drag-widget">
                  <i class="el-icon-rank"></i>
                </el-tag>
              </div>
            </el-row>
          </template>
          <template v-else>
            <widgetformitem v-if="item && item.key" :select.sync="selectWidget" :eleItem="item" :eleIndex="index" :listdata="configFormData"></widgetformitem>
          </template>
        </div>
      </draggable>
    </el-form>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
// 每个表单数据
import widgetformitem from './widgetFormItem'
import { copy as utilCopy } from '@/utils/clone.js'
export default {
  components: {
    draggable: draggable,
    widgetformitem: widgetformitem
  },
  // 接收拖拽时传递过来的数据
  props: ['configFormData', 'select'],
  data() {
    return {
      // 拖拽的表单
      selectWidget: this.select
    }
  },
  watch: {
    select(itemdata) {
      this.selectWidget = itemdata
    },
    selectWidget: {
      handler(data) {
        this.$emit('update:select', data)
      }
    }
  },
  methods: {
    // 拖拽完成事件
    handleWidgetAdd(e) {
      // 获取当前拖拽的元素在放置栏中的下标
      const newIndex = e.newIndex
      // 设置元素唯一key值
      const key = `${Date.parse(new Date())}_${Math.ceil(
        Math.random() * 99999
      )}`
      // 拖拽完成后往当前元素的options添加remoteFunc，options平级添加key，model
      this.$set(this.configFormData.list, newIndex, {
        // 解构语法解构当前数据达到深拷贝效果，改变数据不会影响原有数据
        ...this.configFormData.list[newIndex],
        // 同名属性覆盖原有属性
        options: {
          ...this.configFormData.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        // 新增属性key
        key,
        // 新增属性model
        model: this.configFormData.list[newIndex].type + '_' + key,
        rules: []
      })

      // 深拷贝数据，使重复组件之前相互不受影响
      this.$set(
        this.configFormData.list,
        newIndex,
        utilCopy(this.configFormData.list[newIndex])
      )
      // 获取拖拽的表单数据,子父组件数据双向绑定实时改变右侧配置
      this.selectWidget = this.configFormData.list[newIndex]
    },
    // 点击栅格布局组件触发
    handleSelectWidget(index) {
      this.selectWidget = this.configFormData.list[index]
    },
    // 栅格布局删除组件方法
    removeWidgetElement(index) {
      if (this.configFormData.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {
            key: null,
            options: {
              placeholder: null
            }
          }
        } else {
          this.selectWidget = this.configFormData.list[index - 1]
        }
      } else {
        this.selectWidget = this.configFormData.list[index + 1]
      }
      this.$nextTick(() => {
        this.configFormData.list.splice(index, 1)
      })
    },
    // 栅格布局拖拽完成事件
    handleWidgetColAdd($event, row, colIndex) {
      const newIndex = $event.newIndex
      // 设置元素唯一key值
      const key = `${Date.parse(new Date())}_${Math.ceil(
        Math.random() * 99999
      )}`
      // 拖拽完成后往当前元素的options添加remoteFunc，options平级添加key，model
      this.$set(row.columns[colIndex].list, newIndex, {
        // 解构语法解构当前数据达到深拷贝效果，改变数据不会影响原有数据
        ...row.columns[colIndex].list[newIndex],
        // 同名属性覆盖原有属性
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        // 新增属性key
        key,
        // 新增属性model
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      })

      // 深拷贝数据，使重复组件之前相互不受影响
      this.$set(
        row.columns[colIndex].list,
        newIndex,
        utilCopy(row.columns[colIndex].list[newIndex])
      )
      // 获取拖拽的表单数据,子父组件数据双向绑定实时改变右侧配置
      this.selectWidget = row.columns[colIndex].list[newIndex]
    }
  }
}
</script>

<style scoped lang="scss">
.main-form-box {
  position: relative;
}
.null-form {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  color: #999999;
}
.null-icon {
  display: grid;
  align-items: end;
  font-size: 93px;
}

.container-form {
  margin: 10px;
  border: 1px dashed #999;
  min-height: 89vh;
  padding-right: 5px;
}
.formitem-style {
  margin: 5px;
  border: 1px dashed #999;
}
.view-operations {
  display: none;
}
.widget-view-grid {
  margin-bottom: 0px !important;
  height: 30px;
}
.widget-col {
  padding-bottom: 0;
  padding: 5px;
  background-color: rgba(253, 246, 236, 0.3);
  .widget-col.active {
    outline: 2px solid #e6a23c;
  }
  .widget-col :hov {
    background: #fdf6ec;
    outline: 1px solid #e6a23c;
    outline-offset: 0px;
  }
  .widget-col.active {
    outline: 2px solid #e6a23c;
    border: 1px solid #e6a23c;
    outline-offset: 0;
  }
  .el-col {
    min-height: 50px;
  }
  .widget-col-action {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    cursor: pointer;
  }
  .grid-tag {
    background: #e6a23c;
    border: 1px solid #e6a23c;
  }
}
.widget-col-list {
  min-height: 50px;
  border: 1px dashed #ccc;
  background: #fff;
}
</style>
