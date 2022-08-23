<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label='附件上传:' slot='upload'>
        <myOtherUpload ref='myExUpload' :fileList='fileList'></myOtherUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      fromValiData: {},
      rules: {},
      fromItemList: []
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.$refs.myExUpload.uploadList.length > 0) {
        this.$refs.myExUpload.upload(this, this, this.layerid)
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.btnLoading = false
      } else {
        this.btnLoading = false
        this.$message({
          message: '请添加附件文件',
          type: 'error'
        })
      }
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
.ss {
  text-align: center;
}
</style>
