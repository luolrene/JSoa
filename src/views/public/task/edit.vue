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
import person from './input_person.vue'
import { getTaskAdd, getTaskModify } from '@/api/public/task.js'
export default {
  inject: ['reload'],
  props: {
    params: Object,
    fatherId: Number,
    grade: Number,
    new: Number,
    layerid: ''
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      responsibilityUser: [], // 负责人
      noticeUser: [], // 抄送人
      participateInUser: [], // 参与人
      fromValiData: {
        responsibilityUserName: '',
        responsibilityUserId: '',
        noticeUserId: '',
        noticeUserName: '',
        participateInUserId: '',
        participateInUserName: ''
      },
      rules: {
        title: [{ required: true, message: '请填写任务标题', trigger: 'blur' }],
        introduce: [{ required: true, message: '请填写任务描述', trigger: 'blur' }],
        deadlineTime: [{ required: true, message: '请选择截止时间', trigger: 'blur' }],
        critical: [{ required: true, message: '请选择紧要程度', trigger: 'blur' }],
        responsibilityUserName: [{ required: true, message: '请选择负责人', trigger: 'blur' }],
        taskType: [{ required: true, message: '请选择任务类型', trigger: 'blur' }],
        judgeAcceptance: [{ required: true, message: '请选择是否验收', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '任务标题', prop: 'title', value: '', type: 'input', isRqd: true },
        { label: '任务描述', prop: 'introduce', value: '', type: 'textarea', isRqd: true },
        { label: '关联项目', prop: 'projectName', value: '', type: 'select', data: [] },
        { label: '截止时间', prop: 'deadlineTime', value: '', type: 'date', isRqd: true },
        {
          label: '紧要程度',
          prop: 'critical',
          value: '',
          type: 'select',
          data: [
            { name: '普通', id: '1' },
            { name: '紧急', id: '2' },
            { name: '非常紧急', id: '3' }
          ],
          isRqd: true
        },
        { label: '负责人', prop: 'responsibilityUserName', value: '', type: 'inputChoice', click: 'getPrincipalData', isRqd: true },
        { label: '参与人', prop: 'participateInUserName', value: '', type: 'inputChoice', click: 'getParticipantData', isRqd: true },
        { label: '抄送人', prop: 'noticeUserName', value: '', type: 'inputChoice', click: 'getNoticeUserData', isRqd: true },
        {
          label: '任务类型',
          prop: 'taskType',
          value: '',
          type: 'select',
          data: [
            { name: '周期任务', id: '1' },
            { name: '月度任务', id: '2' },
            { name: '普通任务', id: '3' }
          ],
          isRqd: true
        },
        { label: '到期提醒', prop: 'remindTime', value: '', type: 'date' },
        { label: '是否验收', prop: 'judgeAcceptance', value: '', type: 'select', data: [{ name: '是', id: '1' }, { name: '否', id: '2' }], isRqd: true }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params) {
        getTaskModify(this.fromValiData)
          .then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
            this.$layer.close(this.layerid)
            this.$share.message()
            if (this.new === 2) {
              this.$parent.handelPass()
            } else {
              this.$parent.getListData()
            }
            this.btnLoading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.btnLoading = false
          })
      } else {
        getTaskAdd(this.fromValiData)
          .then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
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
    // 负责人
    getPrincipalData() {
      this.$layer.iframe({
        content: {
          content: person, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            type: 'principal',
            userData: this.responsibilityUser,
            groupIdAll: this.$store.getters.userInfo.groupIdAll.split(',')
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择负责人',
        maxmin: true,
        shadeClose: false
      })
    },
    // 参与人
    getParticipantData() {
      this.$layer.iframe({
        content: {
          content: person, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            type: 'participant',
            userData: this.participateInUser
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择负责人',
        maxmin: true,
        shadeClose: false
      })
    },
    // 抄送人
    getNoticeUserData() {
      this.$layer.iframe({
        content: {
          content: person, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            type: 'noticeUser',
            userData: this.noticeUser
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择抄送人',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    if (this.fatherId) {
      this.fromValiData.fatherId = this.fatherId
      this.fromValiData.grade = this.grade + 1
    }
    if (this.params) {
      this.fromValiData = this.params
      this.fromItemList.forEach(item => {
        if (item.prop === 'title') {
          item.disabled = true
        }
        if (item.prop === 'deadlineTime') {
          item.disabled = true
        }
        if (item.prop === 'critical') {
          item.disabled = true
        }
      })
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
