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
      name: '保存',
      newFromData: {},
      fromValiData: {
        userName: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupName: this.$store.getters.userInfo.groupName,
        groupIdAll: this.$store.getters.userInfo.groupIdAll,
        duration: ''
      },
      rules: {
        type: [{ required: true, message: '请选择请假类型', trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
        cause: [{ required: true, message: '请填写请假事由', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '请假类型',
          prop: 'type',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            { name: '调休', id: '1' },
            { name: '事假', id: '2' },
            { name: '病假', id: '3' },
            { name: '婚假', id: '4' },
            { name: '年假', id: '5' },
            { name: '产假', id: '6' },
            { name: '丧假', id: '7' },
            { name: '陪产假', id: '8' },
            { name: '路途假', id: '9' }
          ]
        },
        { label: '开始时间', prop: 'startTime', value: '', type: 'datetime', click: 'getTime', isRqd: true },
        { label: '结束时间', prop: 'endTime', value: '', type: 'datetime', click: 'getTime', isRqd: true },
        { label: '请假事由', prop: 'cause', value: '', type: 'textarea', isRqd: true }
      ]
    }
  },
  methods: {
    getTime() {
      // if (this.fromValiData.endTime && this.fromValiData.startTime) {
      //   let times = new Date(this.fromValiData.endTime) - new Date(this.fromValiData.startTime)
      //   times = (times / 3600000).toFixed(2)
      //   this.fromValiData.duration = times + '小时'
      // }
    },
    onSubmit() {
      if (this.params) {
        this.$layer.close(this.layerid)
      } else if (this.datas) {
        getCustomizedFormAddCustomizedLeave(this.fromValiData).then(res => {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
          this.newFromData = this.datas
          this.newFromData.customFormType = 17
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
