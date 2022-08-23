<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="90">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber, times } from '@/utils/public.js'
import { getPaymentDetailedAdd, getPaymentDetailedModify } from '@/api/finance/borrow.js'
export default {
  props: {
    params: Object,
    datas: Object,
    type: Number,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      balanceMoney: '',
      fromValiData: {
        paymentAmount: null
      },
      rules: {
        paymentAmount: [{ required: true, message: '请填写付款金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        paymentTime: [{ required: true, message: '请选择付款时间', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '付款金额',
          prop: 'paymentAmount',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '付款时间',
          prop: 'paymentTime',
          value: '',
          type: 'date',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      if (this.params) {
        getPaymentDetailedModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$parent.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        if (this.fromValiData.paymentAmount > this.datas.balanceMoney) {
          this.$message.error('付款金额超出未付款金额，请确认');
        } else {
          getPaymentDetailedAdd(this.fromValiData)
            .then(res => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$parent.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            })
            .catch(() => {
              this.btnLoading = false
            })
        }
      }
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    } else {
      if (this.datas.balanceMoney) {
        this.fromValiData.paymentAmount = this.datas.balanceMoney
      }
      this.datas.balanceMoney ? this.fromValiData.paymentAmount = this.datas.balanceMoney : this.fromValiData.paymentAmount = null
      this.fromValiData.fatherId = this.datas.id
      this.fromValiData.paymentType = this.type
    }
  },
  created() {
    this.fromValiData.paymentTime = times()
  }
}
</script>

<style scoped lang="scss">
</style>
