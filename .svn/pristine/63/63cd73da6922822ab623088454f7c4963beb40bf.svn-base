<template>
  <div>
    <el-form label-position="top" size="mini">
      <el-form-item label="标签对齐方式" class="form-borderbottom">
        <el-radio-group v-model="formdata.labelPosition">
          <div class="positon-group">
            <el-radio label="right">右对齐(默认值)</el-radio>
            <el-radio label="top">顶部对齐</el-radio>
            <el-radio label="left">左对齐</el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="组件尺寸" class="form-borderbottom">
        <el-radio-group v-model="formdata.size">
          <div class="positon-group">
            <el-radio label="medium">大</el-radio>
            <el-radio label="small">中(默认值)</el-radio>
            <el-radio label="mini">小</el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表单字段宽度(单位:px)" class="form-borderbottom">
        <el-input
          v-model.number="formdata.labelWidth"
          type="number"
          min="10"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['formdata']
}
</script>

<style scoped>
.form-borderbottom {
  margin-bottom: 15px !important;
  padding-bottom: 8px;
  border-bottom: 1px solid #e1e1e1;
}
.positon-group {
  display: grid !important;
  grid-template-columns: 1fr;
}
</style>
