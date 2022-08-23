<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :disabled="true" :labelWidth="90" submitName='确定'>
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import { getFinancePayBackGetDataByApplyId } from '@/api/finance/borrow.js'
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
        paymentAmount: [{ required: true, message: '请填写还款金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        paymentTime: [{ required: true, message: '请选择还款时间', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '还款金额',
          prop: 'payBackAmount',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '还款时间',
          prop: 'payBackTime',
          value: '',
          type: 'date',
          isRqd: true
        },
        {
          label: '还款人',
          prop: 'createUserName',
          value: '',
          type: 'input'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          value: '',
          type: 'input'
        }
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
    getFinancePayBackGetDataByApplyId(this.fromValiData).then(res => {
      this.fromValiData = res.result
    })
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
</style>
