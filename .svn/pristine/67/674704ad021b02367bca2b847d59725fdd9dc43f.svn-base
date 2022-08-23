<template>
  <div class="operate-container">
    <div class="title">
      <p>备忘录</p>
      <div class="content">正文:{{params.cont}}</div>
    </div>
    <div style="text-align:center;margin-top: 50px;">
      <el-button type="primary" class="default-btn" size="small" @click="handleVerify">确认</el-button>
      <el-button type="primary" class="default-btn" size="small" @click="handleDelete">删除</el-button>
    </div>
  </div>
</template>

<script>
import { getMemoDel } from '@/api/home/home.js'
export default {
  inject: ['reload'],
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: false,
      fromValiData: {}
    }
  },
  methods: {
    handleVerify() {
      this.$layer.close(this.layerid)
    },
    handleDelete() {
      this.loading = true
      getMemoDel({ ids: this.params.id })
        .then(res => {
          this.$layer.close(this.layerid)
          this.loading = false
          this.reload()
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() { },
  created() { }
}
</script>

<style scoped >
.title {
  text-align: center;
}
p {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}
.content {
  min-height: 70px;
  text-align: left;
  font-size: 12px;
  color: #2c3e50;
}
</style>
