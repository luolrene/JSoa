<template>
  <div class="operate-container">
    <fromItem ref='fromData' :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="110">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import input from './input_person.vue'
import { TwoNumber } from '@/utils/public.js'
import {
  getReimbursementAdd,
  getReimbursementModify,
  getCallApiGetCustomerByMobilePhone, // 查询用户客户
  getCallApiGetContractByMobilePhone // 查询用户合同
} from '@/api/finance/expense.js'
import { getFinanceLoanGetPaymentDataByUserId } from '@/api/finance/borrow.js' // 关联借款
import { getPaymentFinanceGetPaymentDataByUserId } from '@/api/finance/payment.js' // 关联付款
import { getAssetsMaintenanceGetDataByUserId } from '@/api/home/home.js' // 银行账号
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        bank: '',
        bankSubBranch: '',
        bankAccount: '',
        accountType: '1',
        accountMode: '4',
        reverseEntry: 1,
        loanName: null,
        paymentName: null,
        counterpartsUser: null,
        travelReason: null,
        mobilePhone: this.$store.getters.userInfo.mobile,
        userName: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupName: this.$store.getters.userInfo.groupName,
        groupId: this.$store.getters.userInfo.groupId
      },
      userId: this.$store.getters.userInfo.id,
      borrowData: [], // 关联借款
      paymentData: [], // 关联付款
      datas: [], // 开户人信息
      custData: [], // 用户信息
      contData: [], // 合同信息
      fileList: [], // 附件信息
      userData: [], // 同行人信息
      bankCode: [], // 卡号信息
      bankInfo: ['bankUser', 'bank', 'bankSubBranch', 'bankAccount'],
      rules: {
        accountType: [{ required: true, message: '请选择报销类型', trigger: 'blur' }],
        accountMoney: [{ required: true, message: '请填写报销金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        accountExplain: [{ required: true, message: '请填写报销说明', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        expenseNeedTime: [{ required: true, message: '请选择报销需求时间', trigger: 'blur' }],
        purchaseNumber: [{ required: true, message: '请选择关联采购', trigger: 'blur' }],
        reverseEntry: [{ required: true, message: '请选择是否冲账', trigger: 'blur' }],
        accountMode: [{ required: true, message: '请选择报销方式', trigger: 'blur' }],
        loanName: [{ required: true, message: '请选择关联借款', trigger: 'blur' }],
        bankUser: [{ required: true, message: '请选择开户人', trigger: 'blur' }],
        bank: [{ required: true, message: '请选择开户银行', trigger: 'blur' }],
        bankSubBranch: [{ required: true, message: '请填写开户支行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请选择银行账号', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '借款人', prop: 'userName', value: '', type: 'input', disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', disabled: true },
        { label: '报销类型', prop: 'accountType', value: '', type: 'select', data: [{ name: '费用报销', id: '1' }, { name: '出差报销', id: '2' }], isRqd: true },
        { label: '同行人', prop: 'counterpartsUser', value: '', type: 'inputChoice', click: 'getUserDatas', isShow: true },
        { label: '出差事由', prop: 'travelReason', value: '', type: 'textarea', isRqd: true, isShow: true },
        { label: '报销需求时间', prop: 'accountTime', value: '', type: 'datetime', disabledDate: true },
        { label: '关联客户', prop: 'customerName', value: '', type: 'select', filterable: true, click: 'getCustData', data: [] },
        { label: '关联项目', prop: 'contractName', value: '', type: 'select', filterable: true, click: 'getContData', data: [] },
        { label: '关联采购', prop: 'purchaseNumber', value: '', type: 'select', data: [], isRqd: false, isShow: true },
        {
          label: '是否冲账',
          prop: 'reverseEntry',
          value: '',
          type: 'select',
          data: [
            { name: '是', id: 1 },
            { name: '否', id: 2 }
          ],
          isRqd: true
        },
        { label: '关联借款', prop: 'loanName', value: '', type: 'select', data: [], isRqd: true, isShow: true },
        { label: '关联付款', prop: 'paymentName', value: '', type: 'select', data: [], isShow: true },
        {
          label: '报销方式',
          prop: 'accountMode',
          value: '',
          type: 'select',
          data: [
            { name: '挂账', id: '1' },
            // { name: '冲账', id: '2' },
            { name: '现金支付', id: '3' },
            { name: '银行支付', id: '4' }
          ],
          isRqd: true
        },
        { label: '开户人', prop: 'bankUser', value: '', type: 'select', filterable: true, create: true, click: 'getUserData', data: [], isRqd: true },
        { label: '开户银行', prop: 'bank', value: '', type: 'input', isRqd: true },
        { label: '开户支行', prop: 'bankSubBranch', value: '', type: 'input', isRqd: true },
        { label: '银行账号', prop: 'bankAccount', value: '', type: 'input', isRqd: true },
        { label: '备注', prop: 'exp', value: '', type: 'textarea' }
      ]
    }
  },
  watch: {
    // 报销类型
    'fromValiData.accountType': {
      deep: true,
      handler: function (newV) {
        // 出差报销
        if (newV === '2') {
          this.fromItemList.forEach(item => {
            // 同行人
            if (item.prop === 'counterpartsUser') {
              item.isShow = false
            }
            // 出差事由
            if (item.prop === 'travelReason') {
              item.isShow = false
            }
          })
        } else {
          this.fromItemList.forEach(item => {
            // 同行人
            if (item.prop === 'counterpartsUser') {
              item.isShow = true
              this.fromValiData.counterpartsUser = null
            }
            // 出差事由
            if (item.prop === 'travelReason') {
              item.isShow = true
              this.fromValiData.travelReason = null
              this.userData = []
            }
          })
          // 报销类型
          this.fromItemList.forEach(item => {
            if (item.prop === 'purchaseNumber') {
              // 日常报销
              if (newV === '1') {
                item.isRqd = false
                item.isShow = true
              } else {
                item.isRqd = true
                item.isShow = false
              }
            }
          })
        }
      }
    },
    // 是否冲账
    'fromValiData.reverseEntry': {
      deep: true,
      immediate: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'loanName') {
            if (newV === 1) {
              item.isShow = false
              item.isRqd = true
            } else {
              item.isShow = true
              item.isRqd = false
              this.fromValiData.loanName = null
              this.fromValiData.loanId = null
            }
          }
          if (item.prop === 'paymentName') {
            if (newV === 1) {
              item.isShow = false
            } else {
              item.isShow = true
              this.fromValiData.paymentName = null
              this.fromValiData.paymentId = null
            }
          }
        })
      }
    },
    // 银行账号的显隐
    'fromValiData.accountMode': {
      deep: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (newV === '4') {
            if (this.bankInfo.includes(item.prop)) {
              item.isShow = false
              item.isRqd = true
            }
          } else {
            if (this.bankInfo.includes(item.prop)) {
              item.isShow = true
              item.isRqd = false
              this.fromValiData.bankUser = null
              this.fromValiData.bank = null
              this.fromValiData.bankSubBranch = null
              this.fromValiData.bankAccount = null
            }
          }
        })
      }
    }
  },
  methods: {
    // 多选 通过多个id 匹配数组
    // a为id的合计  b为整个数组
    getDataNames(a, b) {
      var c = [] // 临时定义数组，用来存数据
      var d = [] // 最终结果
      a.map(function (item) {
        c = b.filter(function (obj) {
          return obj.id === item
        })
        d.push(Object.assign({}, ...c))
      })
      return d
    },
    onSubmit() {
      // 借款
      if (this.fromValiData.loanName && !this.params) {
        if (Array.isArray(this.fromValiData.loanName)) {
          let borrowData = this.getDataNames(this.fromValiData.loanName, this.borrowData)
          let loanName = borrowData.map(xdd => {
            return xdd.name
          })
          let loanId = borrowData.map(xdd => {
            return xdd.id
          })
          this.fromValiData.loanName = String(loanName)
          this.fromValiData.loanId = String(loanId)
        } else {
          let id = this.fromValiData.loanName
          let obj = this.borrowData.find(function (e) {
            return e.id === id
          })
          this.fromValiData.loanName = obj.name
          this.fromValiData.loanId = obj.id
        }
      } else {
        this.fromValiData.loanId = String(this.fromValiData.loanId)
      }
      // 付款
      if (this.fromValiData.paymentName && !this.params) {
        if (Array.isArray(this.fromValiData.paymentName)) {
          let paymentData = this.getDataNames(this.fromValiData.paymentName, this.paymentData)
          let paymentName = paymentData.map(xdd => {
            return xdd.name
          })
          let paymentId = paymentData.map(xdd => {
            return xdd.id
          })
          this.fromValiData.paymentName = String(paymentName)
          this.fromValiData.paymentId = String(paymentId)
        } else if (!this.fromValiData.paymentId) {
          const id = this.fromValiData.paymentName
          let obj = this.paymentData.find(function (e) {
            return e.id === id
          })
          this.fromValiData.paymentName = obj.name
          this.fromValiData.paymentId = obj.id
        }
      } else {
        this.fromValiData.paymentId = String(this.fromValiData.paymentId)
      }
      if (this.params) {
        if (this.accountType === '1') {
          this.fromValiData.travelSum = this.fromValiData.accountMoney
        }
        getReimbursementModify(this.fromValiData).then(res => {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
        })
          .catch(() => { })
      } else {
        getReimbursementAdd(this.fromValiData).then(res => {
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
    },
    // 同行人
    getUserDatas() {
      this.$layer.iframe({
        content: {
          content: input, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            userData: this.userData
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择同行人',
        maxmin: true,
        shadeClose: false
      })
    },
    // 获取选择的开户
    getUserData(params, item) {
      if (typeof item === 'number') {
        // 找到对应的对象
        const id = item
        let obj = this.datas.find(function (e) {
          return e.id === id
        })
        this.fromValiData.bank = obj.bankName
        this.fromValiData.bankAccount = obj.bankNumber
        this.fromValiData.bankSubBranch = obj.bankSubBranch
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
        this.datas = res.result
        this.datas.forEach(xdd => {
          xdd.name = xdd.bankUserName
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'bankUser') {
            xdd.data = this.datas
          }
        })
      })
    },
    // 获取用户客户
    getCustInfo() {
      getCallApiGetCustomerByMobilePhone(this.fromValiData).then(res => {
        res.result.pageList.forEach(item => {
          this.custData.push({
            name: item.name,
            id: item.id
          })
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'customerName') {
            xdd.data = this.custData
          }
        })
      })
    },
    // 获取客户合同
    getCustData(params, item) {
      if (item) {
        this.fromValiData.custId = item
        const id = item
        let obj = this.custData.find(function (e) {
          return e.id === id
        })
        this.fromValiData.customerId = obj.id
        this.fromValiData.customerName = obj.name
        getCallApiGetContractByMobilePhone(this.fromValiData).then(res => {
          res.result.pageList.forEach(item => {
            this.contData.push({
              name: item.project,
              id: item.id
            })
          })
          this.fromItemList.forEach(xdd => {
            if (xdd.prop === 'contractName') {
              xdd.data = this.contData
            }
          })
        })
      }
    },
    // 获取合同信息
    getContData(params, item) {
      if (item) {
        const id = item
        let obj = this.contData.find(function (e) {
          return e.id === id
        })
        this.fromValiData.contractId = obj.id
        this.fromValiData.contractName = obj.name
      }
    },
    // 获取关联借款信息
    getBorrowData() {
      getFinanceLoanGetPaymentDataByUserId({ userId: this.userId }).then(
        res => {
          this.borrowData = res.result.map(item => {
            return {
              id: item.id,
              name:
                '编号:' +
                item.loanNumber +
                ' ' +
                '金额:' +
                item.borrowingBalance
            }
          })
          this.fromItemList.forEach(xdd => {
            if (xdd.prop === 'loanName') {
              xdd.data = this.borrowData
            }
          })
        }
      )
    },
    // 获取关联付款信息
    getPaymentData() {
      getPaymentFinanceGetPaymentDataByUserId({ userId: this.userId }).then(
        res => {
          if (res.result) {
            this.paymentData = res.result.map(item => {
              return {
                id: item.id,
                name:
                  '编号:' + item.loanNumber + ' ' + '金额:' + item.paymentMoney
              }
            })
            this.fromItemList.forEach(xdd => {
              if (xdd.prop === 'paymentName') {
                xdd.data = this.paymentData
              }
            })
          }
        }
      )
    }
  },
  mounted() {
    this.getUserBankInfo()
    this.getCustInfo()
    this.getBorrowData() // 关联借款
    this.getPaymentData() // 关联付款
    if (this.params) {
      this.fromValiData = this.params
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'loanName') {
          xdd.disabled = true
        }
        if (xdd.prop === 'paymentName') {
          xdd.disabled = true
        }
      })
      if (this.params.loanName) {
        this.fromValiData.loanId = this.params.loanId.split(',')
      }
      if (this.params.paymentName) {
        this.fromValiData.paymentId = this.params.paymentId.split(',')
      }
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
