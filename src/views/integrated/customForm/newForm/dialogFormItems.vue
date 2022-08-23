<template>
  <div>
    <!-- 单行文本 -->
    <template v-if="eleItem.type === 'input'">
      <el-input
        v-model="eleItem.options.defaultValue"
        :placeholder="eleItem.options.placeholder"
        :style="{ width: eleItem.options.width }"
        :disabled="eleItem.options.disabled"
        :clearable="eleItem.options.clearable"
        :show-password="eleItem.options.password"
        :maxlength="eleItem.options.maxlength"
        show-word-limit
      ></el-input>
    </template>
    <!-- 多行文本 -->
    <template v-if="eleItem.type === 'textarea'">
      <el-input
        type="textarea"
        :style="{ width: eleItem.options.width }"
        :rows="eleItem.options.rows"
        v-model="eleItem.options.defaultValue"
        :placeholder="eleItem.options.placeholder"
        :disabled="eleItem.options.disabled"
        :maxlength="eleItem.options.maxlength"
        show-word-limit
      >
      </el-input>
    </template>
    <!-- 单选 -->
    <template v-if="eleItem.type === 'radio'">
      <el-radio-group v-model="eleItem.options.defaultValue">
        <el-radio
          v-for="(item, index) in eleItem.options.valueData"
          :key="index"
          :label="item.label"
          :style="{ display: eleItem.options.inline }"
          :class="{ radioLineHeight: !eleItem.options.border }"
          :disabled="eleItem.options.disabled"
          :border="eleItem.options.border"
          >{{ item.value }}</el-radio
        >
      </el-radio-group>
    </template>
    <!-- 多选 -->
    <template v-if="eleItem.type === 'checkbox'">
      <el-checkbox-group
        v-model="eleItem.options.defaultValue"
        :max="eleItem.options.max"
      >
        <el-checkbox
          v-for="(item, index) in eleItem.options.valueData"
          :key="index"
          :label="item.label"
          :style="{ display: eleItem.options.inline }"
          :disabled="eleItem.options.disabled"
          :border="eleItem.options.border"
          >{{ item.value }}</el-checkbox
        >
      </el-checkbox-group>
    </template>
    <!-- 计数器 -->
    <template v-if="eleItem.type === 'inputNumber'">
      <el-input-number
        v-model="eleItem.options.defaultValue"
        :min="eleItem.options.min"
        :max="eleItem.options.max"
        :controls-position="eleItem.options.position"
        :disabled="eleItem.options.disabled"
      ></el-input-number>
    </template>
    <!-- 下拉框 -->
    <template v-if="eleItem.type === 'select'">
      <el-select
        v-model="eleItem.options.defaultValue"
        placeholder="请选择一个选项"
        :style="{ width: eleItem.options.width }"
        :multiple="eleItem.options.multiple"
        :clearable="eleItem.options.clearable"
        :disabled="eleItem.options.disabled"
      >
        <el-option
          v-for="item in eleItem.options.valueData"
          :key="item.label"
          :label="item.value"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </template>
    <!-- 时间选择器 -->
    <template v-if="eleItem.type === 'timePicker'">
      <el-time-picker
        :style="{ width: eleItem.options.width }"
        v-model="eleItem.options.defaultValue"
        placeholder="选择时间"
        :disabled="eleItem.options.disabled"
        :clearable="eleItem.options.clearable"
        :default-value="new Date()"
        value-format="HH:mm:ss"
        format="HH:mm:ss"
      >
      </el-time-picker>
    </template>
    <!-- 日期选择器 -->
    <template v-if="eleItem.type === 'datePicker'">
      <el-date-picker
        v-model="eleItem.options.defaultValue"
        placeholder="选择日期"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :value-format="eleItem.options.valueFormat"
        :default-value="new Date()"
        :style="{ width: eleItem.options.width }"
        :type="eleItem.options.type"
        :disabled="eleItem.options.disabled"
        :clearable="eleItem.options.clearable"
      >
      </el-date-picker>
    </template>
  </div>
</template>
<script>
export default {
  props: ['eleItem', 'eleConfig']
}
</script>
<style scoped>
.radioLineHeight {
  line-height: 32px;
}
.form-text {
  margin-left: -100px;
  font-style: unset;
}
</style>
