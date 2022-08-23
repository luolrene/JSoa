<template>
  <div class="operate-container">
    <fromItem :obj="this" ref="myFromItem" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="110">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import { getPurchaseGetAdoptDataByUserId, getReimbursementGetDataByUserState } from '../../../api/finance/purchase.js'
import { getPaymentFinanceAdd, getPaymentFinanceModify, getPaymentFinanceApply } from '@/api/finance/payment.js'
import { getAssetsMaintenanceGetDataByUserId } from '@/api/home/home.js'
export default {
  props: {
    params: Object,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      userDatas: [],
      purchaseData: [], // 关联采购
      applyData: [], // 关联报销
      fileList: [],
      bankCode: [],
      userId: this.$store.getters.userInfo.id,
      fromValiData: {
        paymentType: '2',
        bankUser: '',
        bank: '',
        bankSubBranch: '',
        bankAccount: '',
        accountBank: null,
        typeDetails: null,
        associatedApplication: null,
        reimbursementName: null,
        mobilePhone: this.$store.getters.userInfo.mobile,
        name: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupName: this.$store.getters.userInfo.groupName,
        groupId: this.$store.getters.userInfo.groupId
      },
      bankInfo: ['bankUser', 'bank', 'bankSubBranch', 'bankAccount'],
      rules: {
        name: [{ required: true, message: '请填写申请人', trigger: 'blur' }],
        type: [{ required: true, message: '请选择付款申请类别', trigger: 'blur' }],
        typeDetails: [{ required: true, message: '请选择采购类型', trigger: 'blur' }],
        contractNumber: [{ required: true, message: '请填写合同号', trigger: 'blur' }],
        contractAmount: [{ required: true, message: '请填写合同金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        paymentMoney: [{ required: true, message: '请填写付款申请金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        paymentDemandTime: [{ required: true, message: '请选择付款申请需求时间', trigger: 'blur' }],
        associatedApplication: [{ required: true, message: '请选择关联的采购申请', trigger: 'blur' }],
        reimbursementName: [{ required: true, message: '请选择关联的报销申请', trigger: 'blur' }],
        paymentCause: [{ required: true, message: '请填写付款申请原因', trigger: 'blur' }],
        paymentType: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
        bankUser: [{ required: true, message: '请输入开户人', trigger: 'blur' }],
        bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        bankSubBranch: [{ required: true, message: '请填写开户支行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '申请人', prop: 'name', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '付款申请类别', prop: 'type', value: '', type: 'select', data: [{ name: '保证金', id: '1' }, { name: '日常费用', id: '2' }, { name: '采购付款', id: '3' }, { name: '招投标付款', id: '4' }], isRqd: true },
        { label: '采购类型', prop: 'typeDetails', value: '', type: 'select', data: [{ name: '预付款', id: '1' }, { name: '项目款', id: '2' }], isRqd: true },
        { label: '关联采购申请', prop: 'associatedApplication', value: '', type: 'select', isShow: true, isRqd: true, data: [] },
        { label: '关联报销申请', prop: 'reimbursementName', value: '', type: 'select', isShow: true, isRqd: true, data: [] },
        { label: '合同号', prop: 'contractNumber', value: '', type: 'input', isRqd: false, isShow: true },
        { label: '合同金额', prop: 'contractAmount', value: '', type: 'input', isRqd: false, isShow: true },
        { label: '付款申请金额', prop: 'paymentMoney', value: '', type: 'input', isRqd: true },
        { label: '申请原因', prop: 'paymentCause', value: '', type: 'textarea', isRqd: true },
        { label: '申请需求时间', prop: 'paymentDemandTime', value: '', type: 'datetimes', disabledDate: true },
        { label: '支付方式', prop: 'paymentType', value: '', type: 'select', data: [{ name: '现金', id: '1' }, { name: '银行', id: '2' }], isRqd: true },
        { label: '开户人', prop: 'bankUser', value: '', type: 'select', filterable: true, create: true, click: 'getUserData', data: [], isRqd: true },
        { label: '开户银行', prop: 'bank', value: '', type: 'input', isRqd: true },
        { label: '开户支行', prop: 'bankSubBranch', value: '', type: 'input', isRqd: true },
        { label: '银行账号', prop: 'bankAccount', value: '', type: 'input', isRqd: true },
        { label: '备注', prop: 'exp', value: '', type: 'textarea' }
      ]
    }
  },
  watch: {
    // 付款申请类型
    'fromValiData.type': {
      deep: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'typeDetails') {
            if (newV === '3') {
              item.isRqd = true
              item.isShow = false
            } else {
              item.isRqd = false
              item.isShow = true
              this.fromValiData.typeDetails = null
            }
          }
        })
      }
    },
    // 采购类型
    'fromValiData.typeDetails': {
      deep: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'associatedApplication') {
            if (newV === '1' || newV === '2') {
              item.isRqd = true
              item.isShow = false
            } else {
              item.isRqd = false
              item.isShow = true
              this.fromValiData.associatedApplication = null
              this.fromValiData.associatedApplicationId = null
            }
          }
          if (item.prop === 'reimbursementName') {
            if (newV === '2') {
              item.isRqd = true
              item.isShow = false
            } else {
              item.isRqd = false
              item.isShow = true
              this.fromValiData.reimbursementName = null
              this.fromValiData.reimbursementId = null
            }
          }
        })
      }
    },
    // 银行账号的显隐
    'fromValiData.paymentType': {
      deep: true,
      // bankInfo
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (newV === '1') {
            if (this.bankInfo.includes(item.prop)) {
              item.isShow = true
              item.isRqd = false
              this.fromValiData.bankUser = null
              this.fromValiData.bank = null
              this.fromValiData.bankSubBranch = null
              this.fromValiData.bankAccount = null
            }
          } else if (newV === '2') {
            if (this.bankInfo.includes(item.prop)) {
              item.isShow = false
              item.isRqd = true
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.params) {
        getPaymentFinanceModify(this.fromValiData)
          .then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        if (this.$refs.myUpload.uploadList.length === 0 && this.fromValiData.type !== '2') {
          this.$share.message('请上传附件', 'warning')
        } else {
          if (this.fromValiData.associatedApplication) {
            const id = this.fromValiData.associatedApplication
            let obj = this.purchaseData.find(function (e) {
              return e.id === id
            })
            this.fromValiData.associatedApplication = obj.name
            this.fromValiData.associatedApplicationId = obj.id
          }
          if (this.fromValiData.reimbursementName) {
            const id = this.fromValiData.reimbursementName
            let obj = this.applyData.find(function (e) {
              return e.id === id
            })
            this.fromValiData.reimbursementName = obj.name
            this.fromValiData.reimbursementId = obj.id
          }

          if (this.datas) {
            getPaymentFinanceAdd(this.fromValiData)
              .then(res => {
                this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
                this.newFromData = res.result
              })
              .then(() => {
                getPaymentFinanceApply(this.newFromData)
                  .then(res => {
                    this.$layer.close(this.layerid)
                    this.$parent.getListData()
                    this.$share.message()
                    this.btnLoading = false
                  })
                  .catch(() => {
                    this.btnLoading = false
                  })
              })
          } else {
            getPaymentFinanceAdd(this.fromValiData)
              .then(res => {
                this.$refs.myUpload.upload(
                  res.result.onlyCode,
                  this,
                  this.layerid
                )
                this.$layer.close(this.layerid)
                this.$parent.getListData()
                this.$share.message()
              })
              .catch(() => {
                this.btnLoading = false
              })
          }
        }
      }
    },
    // 获取选择的开户
    getUserData(params, item) {
      if (typeof item === 'number') {
        // 找到对应的对象
        const id = item
        let obj = this.userDatas.find(function (e) {
          return e.id === id
        })
        this.fromValiData.bank = obj.bankName
        this.fromValiData.bankSubBranch = obj.bankSubBranch
        this.fromValiData.bankAccount = obj.bankNumber
        this.fromValiData.bankUser = obj.name
      } else {
        this.fromValiData.bank = ''
        this.fromValiData.bankAccount = ''
        this.fromValiData.bankSubBranch = ''
      }
    },
    // 获取用户银行卡信息
    getUserBankInfo() {
      getAssetsMaintenanceGetDataByUserId({ userId: this.userId }).then(res => {
        this.userDatas = res.result
        this.userDatas.forEach(xdd => {
          xdd.name = xdd.bankUserName
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'bankUser') {
            xdd.data = this.userDatas
          }
        })
      })
    },
    // 关联采购申请
    getPurchaseData() {
      getPurchaseGetAdoptDataByUserId({ userId: this.userId }).then(res => {
        this.purchaseData = res.result
        this.purchaseData.forEach(xdd => {
          xdd.name = '编号:' + xdd.loanNumber + '金额:' + xdd.actualMoney
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'associatedApplication') {
            xdd.data = this.purchaseData
          }
        })
      })
    },
    // 关联报销为挂账
    getApplyData() {
      getReimbursementGetDataByUserState({ userId: this.userId }).then(res => {
        this.applyData = res.result
        this.applyData.forEach(xdd => {
          xdd.name = '编号:' + xdd.loanNumber + '金额:' + xdd.detailedSumMoney
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'reimbursementName') {
            xdd.data = this.applyData
          }
        })
      })
    }
  },
  mounted() {
    this.getUserBankInfo()
    this.getPurchaseData() // 关联采购申请
    this.getApplyData() // 关联报销申请（挂账）
    if (this.params) {
      this.fromValiData = this.params
      let datas = ['type', 'typeDetails', 'associatedApplication', 'reimbursementName']
      this.fromItemList.forEach(xdd => {
        if (datas.includes(xdd.prop)) {
          xdd.disabled = true
        }
      })
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
