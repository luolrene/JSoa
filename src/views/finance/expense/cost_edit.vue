<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="90">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber } from '@/utils/public.js'
import { getReimbursementCostAdd, getReimbursementCostModify } from '@/api/finance/expense.js'
import { getPurchaseGetAdoptDataByUserId } from '@/api/finance/purchase.js' // 关联采购
import { getEntertainGetDataByUserIdState } from '@/api/finance/business.js' // 关联采购
export default {
  props: {
    params: Object,
    dataList: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        purchaseName: ''
      },
      userId: this.$store.getters.userInfo.id,
      purchaseData: [], // 关联采购
      entertainData: [], // 关联招待
      bankCode: [],
      rules: {
        costType: [{ required: true, message: '请选择费用类型', trigger: 'blur' }],
        costMoney: [{ required: true, message: '请填写报销金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        costReason: [{ required: true, message: '请填写报销原因', trigger: 'blur' }],
        purchaseNumber: [{ required: true, message: '请选择关联采购', trigger: 'blur' }],
        receptionNumber: [{ required: true, message: '请填写关联招待', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '费用类型',
          prop: 'costType',
          value: '',
          type: 'select',
          data: [
            { name: '日常报销', id: 1 },
            { name: '差旅报销', id: 2 },
            { name: '招待报销', id: 3 },
            { name: '采购报销', id: 4 },
            { name: '招投标报销', id: 5 }
          ],
          isRqd: true
        },
        { label: '报销金额', prop: 'costMoney', value: '', type: 'input', isRqd: true },
        { label: '报销原因', prop: 'costReason', value: '', type: 'input', isRqd: true },
        { label: '关联招待', prop: 'receptionNumber', value: '', type: 'select', multiple: true, isRqd: true },
        { label: '关联采购', prop: 'purchaseNumber', value: '', type: 'select', multiple: true, isRqd: true },
        { label: '备注', prop: 'remarks', value: '', type: 'textarea' }
      ]
    }
  },
  watch: {
    'fromValiData.costType': {
      deep: true,
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'receptionNumber') {
            if (newV !== 3) {
              item.isShow = true
              item.isRqd = false
            } else {
              item.isShow = false
              item.isRqd = true
            }
          }
          if (item.prop === 'purchaseNumber') {
            if (newV !== 4) {
              item.isShow = true
              item.isRqd = false
            } else {
              item.isShow = false
              item.isRqd = true
            }
          }
        })
      }
    }
  },
  methods: {
    // 多选 通过多个id 匹配数组
    // a为id的合计  b为整个数组
    getDataName(a, b) {
      var c = [] // 临时定义数组，用来存数据
      var d = [] // 最终结果
      a.map(item => {
        c = b.filter(obj => {
          return obj.id === item
        })
        d.push(Object.assign({}, ...c))
      })
      return d
    },
    onSubmit() {
      if (this.params) {
        // 采购
        if (this.fromValiData.purchaseNumber) {
          this.fromValiData.purchaseNumber = String(this.fromValiData.purchaseNumber)
          this.fromValiData.purchaseId = String(this.fromValiData.purchaseId)
        }
        if (this.fromValiData.receptionNumber) {
          this.fromValiData.receptionNumber = String(this.fromValiData.receptionNumber)
          this.fromValiData.receptionId = String(this.fromValiData.receptionId)
        }
        // 编辑
        getReimbursementCostModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$parent.$parent.$parent.$parent.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        // 采购
        if (this.fromValiData.purchaseNumber) {
          let purchaseData = this.getDataName(
            this.fromValiData.purchaseNumber,
            this.purchaseData
          )
          let purchaseNumber = purchaseData.map(xdd => {
            return xdd.name
          })
          let purchaseId = purchaseData.map(xdd => {
            return xdd.id
          })
          this.fromValiData.purchaseNumber = String(purchaseNumber)
          this.fromValiData.purchaseId = String(purchaseId)
        }
        // 招待
        // entertainData
        if (this.fromValiData.receptionNumber) {
          let entertainData = this.getDataName(
            this.fromValiData.receptionNumber,
            this.entertainData
          )
          let receptionNumber = entertainData.map(xdd => {
            return xdd.name
          })
          let receptionId = entertainData.map(xdd => {
            return xdd.id
          })
          this.fromValiData.receptionNumber = String(receptionNumber)
          this.fromValiData.receptionId = String(receptionId)
        }
        // 新增
        getReimbursementCostAdd(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$parent.$parent.$parent.$parent.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
    },
    // 获取关联采购信息
    getPurchaseData() {
      getPurchaseGetAdoptDataByUserId({ userId: this.userId }).then(res => {
        this.purchaseData = res.result.map(item => {
          return {
            id: item.id,
            name: '编号:' + item.loanNumber + ' ' + '物资:' + item.purchaseName
          }
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'purchaseNumber') {
            xdd.data = this.purchaseData
          }
        })
      })
    },
    // 获取业务招待信息
    getEntertainData() {
      getEntertainGetDataByUserIdState({ userId: this.userId }).then(res => {
        this.entertainData = res.result.map(item => {
          return {
            id: item.id,
            name: '编号:' + item.serialNumber + ' ' + '招待事由:' + item.reasons
          }
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'receptionNumber') {
            xdd.data = this.entertainData
          }
        })
      })
    }
  },
  mounted() {
    if (this.dataList) {
      this.fromValiData.fatherId = this.dataList.id
    }
    if (this.params) {
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'costType') {
          xdd.disabled = true
        }
      })
      this.fromValiData = this.params
      if (this.params.purchaseNumber) {
        this.fromValiData.purchaseId = this.params.purchaseId.split(',')
        this.fromValiData.purchaseNumber = this.params.purchaseNumber.split(',')
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'purchaseNumber') {
            xdd.disabled = true
          }
        })
      }
      if (this.params.receptionNumber) {
        this.fromValiData.receptionId = this.params.receptionId.split(',')
        this.fromValiData.receptionNumber = this.params.receptionNumber.split(',')
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'receptionNumber') {
            xdd.disabled = true
          }
        })
      }
    }
    this.getPurchaseData() // 关联采购
    this.getEntertainData() // 关联招待
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
