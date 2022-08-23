<template>
  <el-form-item v-if="eleItem && eleItem.key" :label="eleItem.name" class="widget-view" :class="{ active: selectWidget.key === eleItem.key }" @click.native.stop="handleSelectWidget()" :required="eleItem.options.required">
    <!-- 单行文本 -->
    <template v-if="eleItem.type === 'input'">
      <el-input v-model="eleItem.options.defaultValue" :style="{ width: eleItem.options.width }" :placeholder="eleItem.options.placeholder" :disabled="eleItem.options.disabled" :show-password="eleItem.options.password" :clearable="eleItem.options.clearable" :maxlength="eleItem.options.maxlength" show-word-limit readonly></el-input>
    </template>
    <!-- 多行文本 -->
    <template v-if="eleItem.type === 'textarea'">
      <el-input type="textarea" readonly :style="{ width: eleItem.options.width }" :rows="eleItem.options.rows" v-model="eleItem.options.defaultValue" :placeholder="eleItem.options.placeholder" :disabled="eleItem.options.disabled" :maxlength="eleItem.options.maxlength" show-word-limit>
      </el-input>
    </template>
    <!-- 单选 -->
    <template v-if="eleItem.type === 'radio'">
      <el-radio-group v-model="eleItem.options.defaultValue">
        <el-radio v-for="(item, index) in eleItem.options.valueData" :key="index" :label="item.label" :style="{ display: eleItem.options.inline }" :class="{ radioLineHeight: !eleItem.options.border }" :disabled="eleItem.options.disabled" :border="eleItem.options.border">{{ item.value }}</el-radio>
      </el-radio-group>
    </template>
    <!-- 多选 -->
    <template v-if="eleItem.type === 'checkbox'">
      <el-checkbox-group v-model="eleItem.options.defaultValue" :max="eleItem.options.max">
        <el-checkbox v-for="(item, index) in eleItem.options.valueData" :key="index" :label="item.value" :style="{ display: eleItem.options.inline }" :disabled="eleItem.options.disabled" :border="eleItem.options.border">{{ item.value }}</el-checkbox>
      </el-checkbox-group>
    </template>
    <!-- 计数器 -->
    <template v-if="eleItem.type === 'inputNumber'">
      <el-input-number v-model="eleItem.options.defaultValue" :min="eleItem.options.min" :max="eleItem.options.max" :controls-position="eleItem.options.position" :disabled="eleItem.options.disabled"></el-input-number>
    </template>
    <!-- 下拉框 -->
    <template v-if="eleItem.type === 'select'">
      <el-select v-model="eleItem.options.defaultValue" placeholder="请选择一个选项" :style="{ width: eleItem.options.width }" :multiple="eleItem.options.multiple" :clearable="eleItem.options.clearable" :disabled="eleItem.options.disabled">
        <el-option v-for="item in eleItem.options.valueData" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </template>
    <!-- 时间选择器 -->
    <template v-if="eleItem.type === 'timePicker'">
      <el-time-picker :style="{ width: eleItem.options.width }" v-model="eleItem.options.defaultValue" placeholder="选择时间" :disabled="eleItem.options.disabled" :clearable="eleItem.options.clearable" :default-value="new Date()" value-format="HH:mm:ss" format="HH:mm:ss">
      </el-time-picker>
    </template>
    <!-- 日期选择器 -->
    <template v-if="eleItem.type === 'datePicker'">
      <el-date-picker v-model="eleItem.options.defaultValue" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :value-format="eleItem.options.valueFormat" :default-value="new Date()" :style="{ width: eleItem.options.width }" :type="eleItem.options.type" :disabled="eleItem.options.disabled" :clearable="eleItem.options.clearable">
      </el-date-picker>
    </template>

    <!-- 组件操作按钮 -->
    <div class="view-operations">
      <!-- 移动 -->
      <div>
        <el-tag effect="dark" class="movetag">
          <i class="el-icon-rank"></i>
        </el-tag>
      </div>
      <!-- 删除 -->
      <div>
        <el-tag effect="dark" @click="removeWidgetElement()">
          <i class="el-icon-delete"></i>
        </el-tag>
      </div>
    </div>
  </el-form-item>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable: draggable
  },
  props: ['select', 'eleItem', 'eleIndex', 'listdata'],
  data() {
    return {
      selectWidget: this.select
    }
  },
  methods: {
    // 点击不同的组件触发
    handleSelectWidget() {
      this.selectWidget = this.eleItem
    },
    // 删除组件方法
    removeWidgetElement() {
      const index = this.eleIndex
      if (this.listdata.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {
            key: null,
            options: {
              placeholder: null
            }
          }
        } else {
          this.selectWidget = this.listdata.list[index - 1]
        }
      } else {
        this.selectWidget = this.listdata.list[index + 1]
      }
      this.$nextTick(() => {
        this.listdata.list.splice(index, 1)
      })
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
  }
}
</script>
<style scoped>
.view-operations {
  display: none;
}
.widget-view {
  margin-bottom: 0px !important;
}

.active {
  border: 2px solid #409eff !important;
}
.active .view-operations {
  position: absolute;
  bottom: -5px;
  right: 0;
  display: flex;
  cursor: pointer;
}
.grid-template {
  margin-left: -100px !important;
}
.grid-template > .columns {
  border: 2px solid #9999;
  height: 50px;
}
.radioLineHeight {
  line-height: 32px;
}
.form-text {
  margin-left: -100px;
}
</style>
