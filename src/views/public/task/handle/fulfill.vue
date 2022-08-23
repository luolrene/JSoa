<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="80">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getTaskModify } from '@/api/public/task.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
      },
      fromItemList: [
        { label: '备注', prop: 'exp', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      this.fromValiData.state = '2'
      getTaskModify(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      })
        .catch(err => {
          this.$message.error(err.message)
          this.btnLoading = false
        })
    }
  },
  mounted() {
    this.fromValiData = this.params
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
