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
import { getFinanceLoanAdd, getFinanceLoanModify, getFinanceLoanApply } from '@/api/finance/borrow.js'
import { getAssetsMaintenanceGetDataByUserId } from '@/api/home/home.js'
import { getPurchaseGetAdoptDataByUserId } from '../../../api/finance/purchase.js'

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
      fileList: [],
      bankCode: [],
      newFromData: {},
      userId: this.$store.getters.userInfo.id,
      fromValiData: {
        payment: '2',
        accountBank: null,
        bank: '',
        bankAccount: '',
        bankSubBranch: '',
        contractNumber: null,
        contractAmount: null,
        associatedApplication: null,
        mobilePhone: this.$store.getters.userInfo.mobile,
        name: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupName: this.$store.getters.userInfo.groupName,
        groupId: this.$store.getters.userInfo.groupId
      },
      purchaseData: [], // 关联采购
      bankInfo: ['bankUser', 'bank', 'bankSubBranch', 'bankAccount'],
      rules: {
        type: [{ required: true, message: '请选择借款类别', trigger: 'blur' }],
        contractNumber: [{ required: true, message: '请填写合同号', trigger: 'blur' }],
        contractAmount: [{ required: true, message: '请填写合同金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        borrowingBalance: [{ required: true, message: '请填写借款金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        borrowingDemandTime: [{ required: true, message: '请选择借款需求时间', trigger: 'blur' }],
        repaymentTime: [{ required: true, message: '请选择预计还款时间', trigger: 'blur' }],
        associatedApplication: [{ required: true, message: '请选择关联的采购申请', trigger: 'blur' }],
        borrowingCause: [{ required: true, message: '请填写借款原因', trigger: 'blur' }],
        payment: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
        bankUser: [{ required: true, message: '请输入开户人', trigger: 'blur' }],
        bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        bankSubBranch: [{ required: true, message: '请填写开户支行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '借款人', prop: 'name', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', isRqd: true, disabled: true },
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
            { name: '招投标', id: '8' },
            { name: '其他', id: '9' }
          ],
          isRqd: true
        },
        { label: '合同号', prop: 'contractNumber', value: '', type: 'input', isRqd: false, isShow: true },
        { label: '合同金额', prop: 'contractAmount', value: '', type: 'input', isRqd: false, isShow: true },
        { label: '借款金额', prop: 'borrowingBalance', value: '', type: 'input', isRqd: true },
        { label: '借款原因', prop: 'borrowingCause', value: '', type: 'textarea', isRqd: true },
        { label: '借款需求时间', prop: 'borrowingDemandTime', value: '', type: 'datetimes', disabledDate: true },
        { label: '预计还款时间', prop: 'repaymentTime', value: '', type: 'datetimes', disabledDate: true, isRqd: true },
        { label: '关联采购申请', prop: 'associatedApplication', value: '', type: 'select', data: [] },
        { label: '支付方式', prop: 'payment', value: '', type: 'select', data: [{ name: '现金', id: '1' }, { name: '银行', id: '2' }], isRqd: true },
        { label: '开户人', prop: 'bankUser', value: '', type: 'select', filterable: true, create: true, click: 'getUserData', data: [], isRqd: true },
        { label: '开户银行', prop: 'bank', value: '', type: 'input', isRqd: true },
        { label: '开户支行', prop: 'bankSubBranch', value: '', type: 'input', isRqd: true },
        { label: '银行账号', prop: 'bankAccount', value: '', type: 'input', isRqd: true },
        { label: '备注', prop: 'exp', value: '', type: 'textarea' }
      ]
    }
  },
  watch: {
    // 借款类型
    'fromValiData.type': {
      deep: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'exp') {
            if (newV === '2' || newV === '7') {
              item.isRqd = true
            } else {
              item.isRqd = false
            }
          }
          if (item.prop === 'contractNumber') {
            if (newV === '3') {
              item.isRqd = true
              item.isShow = false
            } else {
              item.isRqd = false
              item.isShow = true
              this.fromValiData.contractNumber = null
            }
          }
          if (item.prop === 'contractAmount') {
            if (newV === '3') {
              item.isRqd = true
              item.isShow = false
            } else {
              item.isRqd = false
              item.isShow = true
              this.fromValiData.contractAmount = null
            }
          }
          if (item.prop === 'associatedApplication') {
            if (newV === '7') {
              item.isRqd = true
              item.isShow = false
            } else {
              item.isRqd = false
              item.isShow = true
              this.fromValiData.associatedApplication = null
              this.fromValiData.associatedApplicationId = null
            }
          }
        })
      }
    },
    // 银行账号的显隐
    'fromValiData.payment': {
      deep: true,
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
      this.btnLoading = true
      if (this.params) {
        getFinanceLoanModify(this.fromValiData)
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
        if (this.fromValiData.associatedApplication) {
          const id = this.fromValiData.associatedApplication
          let obj = this.purchaseData.find(function (e) {
            return e.id === id
          })
          this.fromValiData.associatedApplication = obj.name
          this.fromValiData.associatedApplicationId = obj.id
        }
        if (this.datas) {
          getFinanceLoanAdd(this.fromValiData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
              this.newFromData = res.result
            })
            .then(() => {
              getFinanceLoanApply(this.newFromData)
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
          getFinanceLoanAdd(this.fromValiData)
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
        this.fromValiData.bankAccount = ''
        this.fromValiData.bankSubBranch = ''
        this.fromValiData.bank = ''
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
    }
  },

  mounted() {
    this.getUserBankInfo()
    this.getPurchaseData() // 关联采购
    if (this.params) {
      this.fromValiData = this.params
    }
    let bankCode = this.$store.getters.userInfo.bankCode.split('，')
    bankCode.forEach((item, index) => {
      this.bankCode.push({
        name: item,
        id: item
      })
    })
    this.fromItemList.forEach(item => {
      if (item.prop === 'bank') {
        item.data = this.bankCode
      }
    })
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
