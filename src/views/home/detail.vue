<template>
  <div class="operate-container">
    <div class=" title">
      <div class="content">{{params.noticeNews}}</div>
    </div>
    <div style="text-align:center;margin-top: 50px;">
      <el-button type="primary" class="default-btn" size="small" @click="doSth()">确认</el-button>
    </div>
  </div>
</template>

<script>
import { getNoticeRead } from '../../api/home/home.js'
export default {
  props: {
    params: Object,
    type: Number,
    layerid: ''
  },
  data() {
    return {
      fromValiData: {}
    }
  },
  methods: {
    doSth() {
      getNoticeRead({ ids: this.params.id })
        .then(res => {
          if (this.type) {
            this.$parent.handelRead()
            this.$layer.close(this.layerid)
          } else {
            this.$parent.getListData(1)
            this.$layer.close(this.layerid)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() { },
  created() { },
  destroyed() {
    this.doSth()
  }
}
</script>

<style scoped>
.title {
  margin: 20px 15px;
}
.content {
  text-align: center;
}
</style>
