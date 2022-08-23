<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :disabled="true" submitName='确定' :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
// import { TwoNumber } from '@/utils/public.js'
import { getPaymentFinanceGetDataById } from '@/api/finance/payment.js'
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
      fromValiData: {
        associatedApplication: ''
      },
      rules: {
        name: [{ required: true, message: '请填写申请人', trigger: 'blur' }],
        type: [{ required: true, message: '请选择付款申请类别', trigger: 'blur' }],
        contractNumber: [{ required: true, message: '请填写合同号', trigger: 'blur' }],
        contractAmount: [{ required: true, message: '请填写合同金额', trigger: 'blur' }],
        paymentMoney: [{ required: true, message: '请填写付款申请金额', trigger: 'blur' }],
        paymentDemandTime: [{ required: true, message: '请选择付款申请需求时间', trigger: 'blur' }],
        associatedApplication: [{ required: true, message: '请选择关联的采购申请', trigger: 'blur' }],
        paymentCause: [{ required: true, message: '请填写付款申请原因', trigger: 'blur' }],
        paymentType: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
        bankUser: [{ required: true, message: '请输入开户人', trigger: 'blur' }],
        bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '申请人',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '部门',
          prop: 'groupName',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '付款申请类别',
          prop: 'type',
          value: '',
          type: 'select',
          data: [{ name: '保证金', id: '1' }, { name: '日常费用', id: '2' }, { name: '采购付款', id: '3' }, { name: '招投标付款', id: '4' }],
          isRqd: true
        },
        {
          label: '采购类型',
          prop: 'typeDetails',
          value: '',
          type: 'select',
          data: [{ name: '预付款', id: '1' }, { name: '项目款', id: '2' }],
          isRqd: true
        },
        {
          label: '关联采购申请',
          prop: 'associatedApplication',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '关联报销申请',
          prop: 'reimbursementName',
          value: '',
          type: 'inpu',
          isRqd: true
        },
        {
          label: '合同号',
          prop: 'contractNumber',
          value: '',
          type: 'input',
          isRqd: false,
          isShow: true
        },
        {
          label: '合同金额',
          prop: 'contractAmount',
          value: '',
          type: 'input',
          isRqd: false,
          isShow: true
        },
        {
          label: '付款申请金额',
          prop: 'paymentMoney',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '申请原因',
          prop: 'paymentCause',
          value: '',
          type: 'textarea',
          isRqd: true
        },
        {
          label: '申请需求时间',
          prop: 'paymentDemandTime',
          value: '',
          type: 'date'
        },
        {
          label: '支付方式',
          prop: 'paymentType',
          value: '',
          type: 'select',
          data: [{ name: '现金', id: '1' }, { name: '银行', id: '2' }],
          isRqd: true
        },
        {
          label: '开户人',
          prop: 'bankUser',
          value: '',
          type: 'select',
          filterable: true,
          create: true,
          click: 'getUserData',
          data: [],
          isRqd: true
        },
        {
          label: '开户银行',
          prop: 'bank',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '开户支行',
          prop: 'bankSubBranch',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '银行账号',
          prop: 'bankAccount',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '备注',
          prop: 'exp',
          value: '',
          type: 'textarea'
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
    getPaymentFinanceGetDataById(this.fromValiData).then(res => {
      this.fromValiData = res.result
      this.fromItemList.forEach(item => {
        if (item.prop === 'typeDetails') {
          if (this.fromValiData.typeDetails) {
            item.isShow = false
            item.isRqd = true
          } else {
            item.isShow = true
            item.isRqd = false
          }
        }
        if (item.prop === 'associatedApplication') {
          if (this.fromValiData.associatedApplication) {
            item.isShow = false
            item.isRqd = true
          } else {
            item.isShow = true
            item.isRqd = false
          }
        }
        if (item.prop === 'reimbursementName') {
          if (this.fromValiData.reimbursementName) {
            item.isShow = false
            item.isRqd = true
          } else {
            item.isShow = true
            item.isRqd = false
          }
        }
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
