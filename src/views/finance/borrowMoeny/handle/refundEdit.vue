<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="90">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber, times } from '@/utils/public.js'
import { getFinancePayBackAdd } from '@/api/finance/borrow.js'
export default {
  props: {
    type: Number,
    params: Object,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        payBackType: 1,
        payBackAmount: null
      },
      rules: {
        payBackType: [{ required: true, message: '请选择还款类型', trigger: 'blur' }],
        payBackAmount: [{ required: true, message: '请填写还款金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        payBackTime: [{ required: true, message: '请选择还款时间', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '还款类型',
          prop: 'payBackType',
          value: '',
          type: 'select',
          data: [
            { name: '还款', id: 1 },
            { name: '工资代扣', id: 2 }
          ],
          isRqd: true
        },
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
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.fromValiData.payBackAmount = Number(this.fromValiData.payBackAmount)
      getFinancePayBackAdd(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    }
  },
  mounted() {
    if (this.type) {
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'payBackType') {
          xdd.isShow = true
          xdd.isRqd = false
        }
      })
    }
    if (this.params) {
      this.fromValiData = this.params
    } else {
      if (this.type === 2) {
        this.fromValiData.payBackType = 2
        this.fromValiData.typeJudgment = 2
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'payBackAmount') {
            xdd.label = '销账金额'
          }
          if (xdd.prop === 'payBackTime') {
            xdd.label = '销账时间'
          }
        })
      }
      this.fromValiData.fatherId = this.datas.id
      this.fromValiData.payBackAmount = this.datas.notCancelMoney
    }
  },
  created() {
    this.fromValiData.payBackTime = times()
  }
}
</script>

<style scoped lang="scss">
</style>
