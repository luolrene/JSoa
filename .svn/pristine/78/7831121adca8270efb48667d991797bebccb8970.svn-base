<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" submitName='确定' :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import { getFinanceLoanModify, getFinanceLoanGetDataById } from '@/api/finance/borrow.js'
// import { TwoNumber } from '@/utils/public.js'
export default {
  props: {
    params: Object,
    way: Number, // 1为查看 2为审核
    layerid: ''
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      fromValiData: {},
      rules: {
        // name: [{ required: true, message: '请填写借款人', trigger: 'blur' }],
        // type: [{ required: true, message: '请选择借款类别', trigger: 'blur' }],
        // contractNumber: [{ required: true, message: '请填写合同号', trigger: 'blur' }],
        // contractAmount: [{ required: true, message: '请填写合同金额', trigger: 'blur' }],
        // borrowingBalance: [{ required: true, message: '请填写借款金额', trigger: 'blur' }],
        // repaymentTime: [{ required: true, message: '请选择预计还款时间', trigger: 'blur' }],
        // associatedApplication: [{ required: true, message: '请选择关联的采购申请', trigger: 'blur' }],
        // borrowingCause: [{ required: true, message: '请填写借款原因', trigger: 'blur' }],
        // payment: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
        // bankUser: [{ required: true, message: '请输入开户人', trigger: 'blur' }],
        // bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        // bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }],
        // approvalRepaymentTime: [{ required: true, message: '请选择神审核还款时间', trigger: 'blur' }],
        // approvalMoney: [{ required: true, message: '请选择神审核还款金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        // writeOffRemarks: [{ required: true, message: '请填写未冲账原因', trigger: 'blur' }],
        // delayTime: [{ required: true, message: '请选择延期时间', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '借款人',
          prop: 'name',
          value: '',
          type: 'input',
          disabled: true,
          isRqd: true
        },
        {
          label: '借款类别',
          prop: 'type',
          value: '',
          type: 'select',
          data: [
            { name: '日常费用', id: '1' },
            { name: '保证金', id: '2' },
            { name: '专家费', id: '3' },
            { name: '总经办', id: '4' },
            { name: '差旅费', id: '5' },
            { name: '备用金', id: '6' },
            { name: '采购', id: '7' },
            { name: '其他', id: '8' }
          ],
          disabled: true,
          isRqd: true
        },
        {
          label: '合同号',
          prop: 'contractNumber',
          value: '',
          type: 'input',
          disabled: true,
          isRqd: false
        },
        {
          label: '合同金额',
          prop: 'contractAmount',
          value: '',
          type: 'input',
          disabled: true,
          isRqd: false
        },
        {
          label: '借款金额',
          prop: 'borrowingBalance',
          value: '',
          type: 'input',
          disabled: true,
          isRqd: true
        },
        {
          label: '借款原因',
          prop: 'borrowingCause',
          value: '',
          type: 'textarea',
          disabled: true,
          isRqd: true
        },
        {
          label: '借款需求时间',
          prop: 'borrowingDemandTime',
          value: '',
          type: 'date',
          disabled: true
        },
        {
          label: '预计还款时间',
          prop: 'repaymentTime',
          value: '',
          type: 'date',
          disabled: true,
          isRqd: true
        },
        {
          label: '关联采购申请',
          prop: 'associatedApplication',
          value: '',
          type: 'select',
          disabled: true,
          data: []
        },
        {
          label: '支付方式',
          prop: 'payment',
          value: '',
          type: 'select',
          data: [{ name: '现金', id: '1' }, { name: '银行', id: '2' }],
          disabled: true,
          isRqd: true
        },
        {
          label: '开户人',
          prop: 'bankUser',
          value: '',
          type: 'input',
          filterable: true,
          create: true,
          isRqd: true,
          disabled: true
        },
        {
          label: '开户银行',
          prop: 'bank',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '银行账号',
          prop: 'bankAccount',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: true
        },
        {
          label: '审批还款时间',
          prop: 'approvalRepaymentTime',
          value: '',
          type: 'date',
          disabled: true,
          isRqd: true
        },
        {
          label: '审批还款金额',
          prop: 'approvalMoney',
          value: '',
          type: 'input',
          disabled: true,
          isRqd: true
        },
        {
          label: '延期原因',
          prop: 'writeOffRemarks',
          value: '',
          type: 'textarea',
          disabled: true,
          isRqd: true
        },
        {
          label: '延期时间',
          prop: 'delayTime',
          value: '',
          type: 'date',
          disabled: true,
          isRqd: true
        }
      ]
    }
  },
  watch: {
    'fromValiData.delayTime': {
      deep: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'delayTime') {
            if (newV) {
              item.isRqd = true
            } else {
              item.isRqd = false
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.fromValiData.approvalRepaymentTime) {
        this.btnLoading = true
        getFinanceLoanModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        this.$layer.close(this.layerid)
      }
    }
  },
  mounted() {
    // 延期申请 看
    if (this.way === 1) {
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'delayTime') {
          xdd.disabled = true
          xdd.isShow = true
        }
      })
    }
    if (this.way === 2) {
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'delayTime') {
          xdd.disabled = false
          xdd.isRqd = true
        }
      })
    }
    this.fromValiData.id = this.params.applyId
    getFinanceLoanGetDataById(this.fromValiData).then(res => {
      this.fromValiData = res.result
      this.fromItemList.forEach(item => {
        if (item.prop === 'contractNumber') {
          if (this.fromValiData.type === '3') {
            item.isShow = false
          } else {
            item.isShow = true
          }
        }
      })
      this.fromItemList.forEach(item => {
        if (item.prop === 'contractAmount') {
          if (this.fromValiData.type === '3') {
            item.isShow = false
          } else {
            item.isShow = true
          }
        }
      })
      this.fromItemList.forEach(item => {
        if (item.prop === 'repaymentTime') {
          if (this.fromValiData.type === '2') {
            item.isRqd = true
          } else {
            item.isRqd = false
          }
        }
      })
      this.fromItemList.forEach(item => {
        if (item.prop === 'associatedApplication') {
          if (this.fromValiData.type === '7') {
            item.isShow = false
          } else {
            item.isShow = true
          }
        }
      })
      this.fromItemList.forEach(item => {
        if (item.prop === 'bankUser') {
          if (this.fromValiData.bankUser) {
            item.isShow = false
          } else {
            item.isShow = true
            item.isRqd = false
          }
        }
        if (item.prop === 'bank') {
          if (this.fromValiData.bank) {
            item.isShow = false
          } else {
            item.isShow = true
            item.isRqd = false
          }
        }
        if (item.prop === 'bankAccount') {
          if (this.fromValiData.bankAccount) {
            item.isShow = false
          } else {
            item.isShow = true
            item.isRqd = false
          }
        }
        if (item.prop === 'writeOffRemarks') {
          if (this.fromValiData.writeOffRemarks) {
            item.isShow = false
          } else {
            item.isShow = true
            item.isRqd = false
          }
        }
      })
    })
  },
  created() { }
}
</script>
<style>
.el-textarea.is-disabled .el-textarea__inner {
  color: #666;
}
</style>

<style scoped lang="scss">
</style>
