<!-- 离职表单 -->
<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :label-width="100" submitName='确定'>
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getCustomizedFormGetUserQuit } from '@/api/work/myApprove.js'
import { getCustomizedFormAddUserQuit } from '@/api/work/myApplication' // 提交离职申请
import { getApplyAdd } from '@/api/work/myApplication.js'
export default {
  props: {
    layerid: '',
    params: Object,
    datas: Object
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      newFromData: {},
      fromValiData: {
        userName: '',
        inductionTime: ''
      },
      rules: {
        userId: [{ required: true, message: '请填写申请人', trigger: 'blur' }],
        inductionTime: [{ required: true, message: '请填写入职时间', trigger: 'blur' }],
        lastTime: [{ required: true, message: '请填写最后工作日', trigger: 'blur' }],
        reason: [{ required: true, message: '请填写离职原因', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '申请人', prop: 'userName', value: '', type: 'input', disabled: true },
        { label: '入职日期', prop: 'inductionTime', value: '', type: 'date', isRqd: true },
        { label: '最后工作日', prop: 'lastTime', value: '', type: 'date', isRqd: true },
        { label: '离职原因', prop: 'reason', value: '', type: 'textarea' },
        { label: '备注', prop: 'remarks', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    onSubmit() {
      if (this.params) {
        this.$layer.close(this.layerid)
      } else {
        getCustomizedFormAddUserQuit(this.fromValiData).then(res => {
          this.newFromData = this.datas
          this.newFromData.customFormType = 4
          this.newFromData.customFormId = res.result.id
        }).then(() => {
          getApplyAdd(this.newFromData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
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
    let userInfo = this.$store.getters.userInfo
    this.fromValiData.userId = userInfo.id
    this.fromValiData.userName = userInfo.name
    this.fromValiData.inductionTime = userInfo.formalTime
    if (this.datas) {
      this.newFromData = this.datas
    }
    if (this.params) {
      this.fromItemList.forEach(xdd => {
        xdd.disabled = true
      })
      let obj = {}
      obj.id = this.params.applyId
      getCustomizedFormGetUserQuit(obj).then(res => {
        this.fromValiData = res.result
      })
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
