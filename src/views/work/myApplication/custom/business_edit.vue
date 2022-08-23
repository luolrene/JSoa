<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :disabled="true" :labelWidth="120" submitName='确定'>
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import { getEntertainGetDataByApplyId } from '@/api/finance/business.js'

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
        counterpartsUser: [{ required: true, message: '请选择公司参与人', trigger: 'blur' }],
        treatTime: [{ required: true, message: '请填写招待时间', trigger: 'blur' }],
        reasons: [{ required: true, message: '请填写招待事由', trigger: 'blur' }],
        client: [{ required: true, message: '请填写招待客户', trigger: 'blur' }],
        client2: [{ required: true, message: '请填写招待客户', trigger: 'blur' }],
        client3: [{ required: true, message: '请填写招待客户', trigger: 'blur' }],
        company: [{ required: true, message: '请填写招待单位', trigger: 'blur' }],
        company2: [{ required: true, message: '请填写招待单位', trigger: 'blur' }],
        company3: [{ required: true, message: '请填写招待单位', trigger: 'blur' }],
        position: [{ required: true, message: '请填写对方职务', trigger: 'blur' }],
        position2: [{ required: true, message: '请填写对方职务', trigger: 'blur' }],
        position3: [{ required: true, message: '请填写对方职务', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写对方职务', trigger: 'blur' }],
        phone2: [{ required: true, message: '请填写对方职务', trigger: 'blur' }],
        phone3: [{ required: true, message: '请填写对方职务', trigger: 'blur' }],
        estimatedAmount: [{ required: true, message: '请填写预计金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        project: [{ required: true, message: '请填写招待项目', trigger: 'blur' }],
        estimatedAmount2: [{ required: true, message: '请填写预计金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        project2: [{ required: true, message: '请填写招待项目', trigger: 'blur' }],
        estimatedAmount3: [{ required: true, message: '请填写预计金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        project3: [{ required: true, message: '请填写招待项目', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '申请人', prop: 'name', value: '', type: 'input', disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', disabled: true },
        { label: '公司参与人', prop: 'counterpartsUser', value: '', type: 'inputChoice', click: 'getUserDatas', isRqd: true },
        { label: '招待时间', prop: 'treatTime', value: '', type: 'date', isRqd: true },
        { label: '招待事由', prop: 'reasons', value: '', type: 'textarea', isRqd: true },
        { label: '招待客户', prop: 'client', value: '', type: 'input', isRqd: true },
        { label: '招待单位', prop: 'company', value: '', type: 'input', isRqd: true },
        { label: '对方职务', prop: 'position', value: '', type: 'input', isRqd: true },
        { label: '联系电话', prop: 'phone', value: '', type: 'input', isRqd: true },

        { label: '招待客户②', prop: 'client2', value: '', type: 'input', isRqd: true },
        { label: '招待单位②', prop: 'company2', value: '', type: 'input', isRqd: true },
        { label: '对方职务②', prop: 'position2', value: '', type: 'input', isRqd: true },
        { label: '联系电话②', prop: 'phone2', value: '', type: 'input', isRqd: true },

        { label: '招待客户③', prop: 'client3', value: '', type: 'input', isRqd: true },
        { label: '招待单位③', prop: 'company3', value: '', type: 'input', isRqd: true },
        { label: '对方职务③', prop: 'position3', value: '', type: 'input', isRqd: true },
        { label: '联系电话③', prop: 'phone3', value: '', type: 'input', isRqd: true },

        { label: '预计金额', prop: 'estimatedAmount', value: '', type: 'input', isRqd: true },
        { label: '招待项目', prop: 'project', value: '', type: 'input', isRqd: true },
        { label: '预计金额②', prop: 'estimatedAmount2', value: '', type: 'input', isRqd: true },
        { label: '招待项目②', prop: 'project2', value: '', type: 'input', isRqd: true },
        { label: '预计金额③', prop: 'estimatedAmount3', value: '', type: 'input', isRqd: true },
        { label: '招待项目③', prop: 'project3', value: '', type: 'input', isRqd: true }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$layer.close(this.layerid)
    }
  },
  mounted() {
    this.fromValiData.id = this.params.applyId
    getEntertainGetDataByApplyId(this.fromValiData).then(res => {
      this.fromValiData = res.result
      if (!this.fromValiData.client2) {
        this.fromItemList.forEach(xdd => {
          if (['client2', 'company2', 'position2', 'phone2', 'client3', 'company3', 'position3', 'phone3'].includes(xdd.prop)) {
            xdd.isShow = true
            xdd.isRqd = false
          }
        })
      }
      if (!this.fromValiData.project2) {
        this.fromItemList.forEach(xdd => {
          if (['estimatedAmount2', 'project2', 'estimatedAmount3', 'project3'].includes(xdd.prop)) {
            xdd.isShow = true
            xdd.isRqd = false
          }
        })
      }
    })
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
</style>
