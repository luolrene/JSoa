<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import { getUserBankAdd, getUserBankModify } from '@/api/home/home.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      fromValiData: {
        userId: this.$store.getters.userInfo.id,
        bankUserName: ''
      },
      rules: {
        bankType: [{ required: true, message: '请选择持卡人类型', trigger: 'blur' }],
        bankUserName: [{ required: true, message: '请填写开户人', trigger: 'blur' }],
        bankName: [{ required: true, message: '请填写开户银行', trigger: 'blur' }],
        bankSubBranch: [{ required: true, message: '请填写开户支行', trigger: 'blur' }],
        bankNumber: [{ required: true, message: '请填写银行账号', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '持卡人类型', prop: 'bankType', value: '', type: 'select', data: [{ id: '1', name: '个人' }, { id: '2', name: '其他' }], isRqd: true, click: 'getName' },
        { label: '开户人', prop: 'bankUserName', value: '', type: 'input', isRqd: true },
        { label: '开户银行', prop: 'bankName', value: '', type: 'input', isRqd: true },
        { label: '开户支行', prop: 'bankSubBranch', value: '', type: 'input', isRqd: true },
        { label: '银行账号', prop: 'bankNumber', value: '', type: 'input', isRqd: true },
        { label: '备注', prop: 'remarks', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      if (this.params) {
        getUserBankModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$share.message()
            this.$parent.getListData()
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        getUserBankAdd(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    getName(params, item) {
      if (item === 1) {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'bankUserName') {
            xdd.disabled = true
          }
        })
        this.fromValiData.bankUserName = this.$store.getters.userInfo.name
      } else {
        this.fromValiData.bankUserName = ''
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'bankUserName') {
            xdd.disabled = false
          }
        })
      }
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromItemList.forEach(xdd => {
        if (['bankType', 'bankUserName'].includes(xdd.prop)) {
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
