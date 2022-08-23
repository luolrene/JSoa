<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :disabled="true" submitName='确定'>
    </fromItem>
  </div>
</template>

<script>
import { getTaskDetails } from '@/api/public/task.js'
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
        title: [{ required: true, message: '请填写任务标题', trigger: 'blur' }],
        introduce: [{ required: true, message: '请填写任务描述', trigger: 'blur' }],
        deadlineTime: [{ required: true, message: '请选择截止时间', trigger: 'blur' }],
        critical: [{ required: true, message: '请选择紧要程度', trigger: 'blur' }],
        taskType: [{ required: true, message: '请选择任务类型', trigger: 'blur' }],
        judgeAcceptance: [{ required: true, message: '请选择是否验收', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '任务标题',
          prop: 'title',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '任务描述',
          prop: 'introduce',
          value: '',
          type: 'textarea',
          isRqd: true
        },
        {
          label: '关联项目',
          prop: 'projectName',
          value: '',
          type: 'select',
          data: []
        },
        {
          label: '截止时间',
          prop: 'deadlineTime',
          value: '',
          type: 'date',
          isRqd: true
        },
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
        {
          label: '负责人',
          prop: 'responsibilityUserName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '参与人',
          prop: 'participateInUserName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '抄送人',
          prop: 'noticeUserName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '任务类型',
          prop: 'taskType',
          value: '',
          type: 'select',
          data: [{ name: '周期任务', id: '1' }, { name: '月度任务', id: '2' }],
          isRqd: true
        },
        {
          label: '到期提醒',
          prop: 'remindTime',
          value: '',
          type: 'date'
        },
        {
          label: '是否验收',
          prop: 'judgeAcceptance',
          value: '',
          type: 'select',
          data: [{ name: '是', id: '1' }, { name: '否', id: '2' }],
          isRqd: true
        },
        {
          label: '申请描述',
          prop: 'toExamineDescribe',
          value: '',
          type: 'textarea',
          isRqd: true
        },
        {
          label: '备注',
          prop: 'exp',
          value: '',
          type: 'textarea'
        }
        //
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$layer.close(this.layerid)
    }
  },
  mounted() {
    this.fromValiData.applyId = this.params.applyId
    getTaskDetails(this.fromValiData).then(res => {
      switch (res.result.judgeAcceptance) {
        case '1':
          res.result.judgeAcceptanceName = '是'
          break
        case '2':
          res.result.judgeAcceptanceName = '否'
      }
      switch (res.result.critical) {
        case '1':
          res.result.criticals = '★'
          break
        case '2':
          res.result.criticals = '★★'
          break
        case '3':
          res.result.criticals = '★★★'
      }
      switch (res.result.state) {
        case '1':
          res.result.stateName = '进行中'
          break
        case '2':
          res.result.stateName = '已完成'
          break
        case '3':
          res.result.stateName = '已取消'
          break
        case '4':
          res.result.stateName = '延期'
      }
      this.fromValiData = res.result
    })
  },

  created() { }
}
</script>

<style scoped lang="scss">
</style>
