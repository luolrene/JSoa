<template>
  <div class="operate-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="任务详情">
        <info :params="params"></info>
      </el-tab-pane>
      <el-tab-pane label="任务结构" lazy>
        <task :params="params"></task>
      </el-tab-pane>
      <el-tab-pane label="操作记录" lazy>
        <logData :params="params"></logData>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import info from './details/info.vue'
import task from './details/task.vue'
import logData from './details/logData.vue'

export default {
  components: {
    task,
    info,
    logData
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {}
  },
  methods: {},
  mounted() { },
  created() { },
  beforeDestroy() {
    this.$parent.getListData()
  }
}
</script>

<style lang="scss">
.el-descriptions :not(.is-bordered) td,
.el-descriptions :not(.is-bordered) th {
  width: 200px;
}
</style>
