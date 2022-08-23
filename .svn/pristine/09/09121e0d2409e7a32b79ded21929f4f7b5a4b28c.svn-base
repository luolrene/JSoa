<template>
  <div class="operate-container">
    <fromItem ref="fromValiData" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="90">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getPurchaseModifyActualMoneyState } from '@/api/finance/purchase.js'
import { TwoNumber } from '@/utils/public.js'
export default {
  props: {
    params: Object,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      userInfo: this.$store.getters.userInfo,
      fileList: [],
      newFromData: {},
      fromValiData: {},
      rules: {
        actualMoney: [{ required: true, message: '请填写实际金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }]
      },
      fromItemList: [
        {
          label: '实际金额',
          prop: 'actualMoney',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '采购备注',
          prop: 'exp',
          value: '',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params) {
        getPurchaseModifyActualMoneyState(this.fromValiData)
          .then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode2, this, this.layerid)
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
    addInfo() {
      this.type += 1
    }
  },
  mounted() {
    this.fromValiData = this.params
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
