<template>
  <div class="operate-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="资产信息">
        <message :params="params" />
      </el-tab-pane>
      <el-tab-pane label="资产明细" lazy>
        <particulars :params="params" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import message from './details/message.vue'
import particulars from './details/particulars.vue'
export default {
  components: {
    message,
    particulars
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {}
  },
  mounted() {},
  created() {}
}
</script>

<style lang="scss">
.el-descriptions :not(.is-bordered) td,
.el-descriptions :not(.is-bordered) th {
  width: 200px;
}
.name {
  color: #0195db;
  cursor: pointer;
}
</style>
