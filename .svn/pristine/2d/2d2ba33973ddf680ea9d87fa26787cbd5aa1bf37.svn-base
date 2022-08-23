<!-- 转正表单 -->
<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :label-width="90" submitName='确定'>
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getCustomizedFormGetUserFormal } from '@/api/work/myApprove.js'
import { getApplyAdd, getCustomizedFormAddUserFormal } from '@/api/work/myApplication' // 提交转正申请
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
        inductionTime: '',
        userRole: '',
        jobGrade: ''
      },
      rules: {
        userId: [{ required: true, message: '请填写申请人', trigger: 'blur' }],
        formalTime: [{ required: true, message: '请填写转正日期', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '申请人', prop: 'userName', value: '', type: 'input', disabled: true },
        { label: '入职日期', prop: 'inductionTime', value: '', type: 'date', isRqd: true },
        { label: '试用期', prop: 'probationPeriod', value: '', type: 'input' },
        { label: '转正日期', prop: 'formalTime', value: '', type: 'date', isRqd: true },
        { label: '角色', prop: 'userRole', value: '', type: 'input' },
        { label: '职级', prop: 'jobGrade', value: '', type: 'input' },
        { label: '工作业绩结果描述', prop: 'resultDescription', value: '', type: 'textarea' },
        { label: '价值观落地', prop: 'senseOfWorth', value: '', type: 'textarea' },
        { label: '工作态度和技能', prop: 'attitude', value: '', type: 'textarea' },
        { label: '个人优势和不足', prop: 'advantage', value: '', type: 'textarea' },
        { label: '未来工作方向和目标', prop: 'futureTarget', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    onSubmit() {
      if (this.params) {
        this.$layer.close(this.layerid)
      } else if (this.datas) {
        getCustomizedFormAddUserFormal(this.fromValiData).then(res => {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
          this.newFromData = this.datas
          this.newFromData.customFormType = 3
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
    let userInfo = this.$store.getters.userInfo
    this.fromValiData.userId = userInfo.id
    this.fromValiData.userName = userInfo.name
    this.fromValiData.inductionTime = userInfo.formalTime
    this.fromValiData.userRole = userInfo.roleName
    this.fromValiData.jobGrade = userInfo.administrativeRankName
    if (this.datas) {
      this.fromValiData = this.datas
    }
    if (this.params) {
      this.fromItemList.forEach(xdd => {
        xdd.disabled = true
      })
      let obj = {}
      obj.id = this.params.applyId
      getCustomizedFormGetUserFormal(obj).then(res => {
        this.fromValiData = res.result
      })
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
