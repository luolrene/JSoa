<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :disabled="disabled" :labelWidth="100" :submitName='name'>
      <el-form-item label='附件上传:' slot='upload' v-if="!disabled">
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getApplyAdd, getCustomizedFormAddCustomizedLeave, getCustomizedFormGetCustomizedLeave } from '@/api/work/myApplication'
export default {
  props: {
    params: Object,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      disabled: false,
      fileList: [],
      name: '保存',
      newFromData: {},
      fromValiData: {
        userName: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupName: this.$store.getters.userInfo.groupName,
        groupIdAll: this.$store.getters.userInfo.groupIdAll
      },
      rules: {
        time: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
        cause: [{ required: true, message: '请填写事由', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '时间', prop: 'time', value: '', type: 'datetime', click: 'getTime', isRqd: true },
        { label: '事由', prop: 'cause', value: '', type: 'textarea', click: 'getTime', isRqd: true }

      ]
    }
  },
  methods: {
    getTime() {
    },
    onSubmit() {
      if (this.params) {
        this.$layer.close(this.layerid)
      } else if (this.datas) {
        getCustomizedFormAddCustomizedLeave(this.fromValiData).then(res => {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
          this.newFromData = this.datas
          this.newFromData.customFormType = 18
          this.newFromData.customFormId = res.result.id
        }).then(() => {
          getApplyAdd(this.newFromData)
            .then(res => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            })
            .catch(err => {
              this.$message.error(err.message)
              this.loading = false
            })
        })
      }
    }
  },
  mounted() {
    if (this.params) {
      this.disabled = true
      this.name = '确定'
      let data = {}
      data.id = this.params.applyId
      getCustomizedFormGetCustomizedLeave(data).then(res => {
        this.fromValiData = res.result
      })
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
</style>
