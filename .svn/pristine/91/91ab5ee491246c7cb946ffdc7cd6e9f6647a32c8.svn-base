<template>
  <div class="pc-container">
    <el-row>
      <el-descriptions title='考勤详情' :column='4' :size="size" border>
        <el-descriptions-item v-for="(item,index) in timecard" :key="index" :label='item.name'>{{item.id}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: '',
      timecard: [
        { name: '申请人', id: 'xxx' },
        { name: '部门', id: '综合部' },
        { name: '编号', id: '9527' },
        { name: '请假', id: '1' }
      ]
    }
  }
}
</script>

<style  scoped lang="scss">
>>> .el-descriptions__body .el-descriptions__table {
  height: 40px;
}
</style>
