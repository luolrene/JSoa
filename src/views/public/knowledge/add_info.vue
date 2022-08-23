<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getKnowledgePointsAdd } from '@/api/jcxxgl/knowledge.js'
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
      rules: {
        name: [{ required: true, message: '请填写行业名称', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '分组',
          prop: 'knowName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '描述',
          prop: 'oaDescribe',
          value: '',
          type: 'textarea',
          isRqd: false
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.$refs.myUpload.uploadList.length > 0) {
        getKnowledgePointsAdd(this.fromValiData).then(res => {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$parent.getTreeData()
          this.$share.message()
          this.btnLoading = false
        })
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
  created() { }
}
</script>

<style scoped lang="scss">
</style>
