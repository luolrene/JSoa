<template>
  <div class="operate-container">
    <fromItem ref="fromValiData" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" submitName='确定' :labelWidth="110">
      <el-form-item v-if='type===2' label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getPurchaseGetDataById, getPurchaseModify } from '@/api/finance/purchase.js'
export default {
  props: {
    params: Object,
    type: Number,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      purchase2: ['purchaseName2', 'specifications2', 'purchasePurpose2', 'unit2', 'quantity2', 'demandTime2'],
      purchase3: ['purchaseName3', 'specifications3', 'purchasePurpose3', 'unit3', 'quantity3', 'demandTime3'],
      userInfo: this.$store.getters.userInfo,
      fromValiData: {},
      rules: {
        purchaseType: [{ required: true, message: '请选择物资类别', trigger: 'blur' }],
        purchaseName: [{ required: true, message: '请填写物资名称', trigger: 'blur' }],
        specifications: [{ required: true, message: '请填写物品规格', trigger: 'blur' }],
        purchasePurpose: [{ required: true, message: '请填写物资用途', trigger: 'blur' }],
        unit: [{ required: true, message: '请填写单位', trigger: 'blur' }],
        quantity: [{ required: true, message: '请填写数量', trigger: 'blur' }],
        purchaseName2: [{ required: true, message: '请填写物资名称', trigger: 'blur' }],
        specifications2: [{ required: true, message: '请填写物品规格', trigger: 'blur' }],
        purchasePurpose2: [{ required: true, message: '请填写物资用途', trigger: 'blur' }],
        unit2: [{ required: true, message: '请填写单位', trigger: 'blur' }],
        quantity2: [{ required: true, message: '请填写数量', trigger: 'blur' }],
        purchaseName3: [{ required: true, message: '请填写物资名称', trigger: 'blur' }],
        specifications3: [{ required: true, message: '请填写物品规格', trigger: 'blur' }],
        purchasePurpose3: [{ required: true, message: '请填写物资用途', trigger: 'blur' }],
        unit3: [{ required: true, message: '请填写单位', trigger: 'blur' }],
        quantity3: [{ required: true, message: '请填写数量', trigger: 'blur' }],
        estimateMoney: [{ required: true, message: '请填写预计金额', trigger: 'blur' }],
        demandTime: [{ required: true, message: '请填写需求时间', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '借款人', prop: 'userName', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', isRqd: true, disabled: true },
        {
          label: '物资类别',
          prop: 'purchaseType',
          value: '',
          type: 'select',
          data: [
            { name: '行政办公类', id: '行政办公类' },
            { name: '生活用品类', id: '生活用品类' },
            { name: '生产耗材类', id: '生产耗材类' },
            { name: '固定资产类', id: '固定资产类' },
            { name: '仪器设备类', id: '仪器设备类' },
            { name: '标准书籍类', id: '标准书籍类' },
            { name: '标准物质类', id: '标准物质类' },
            { name: '能力验证', id: '能力验证' },
            { name: '仪器维修耗材', id: '仪器维修耗材' },
            { name: '办公软件', id: '办公软件' }
          ],
          isRqd: true,
          disabled: true
        },
        { label: '物资名称', prop: 'purchaseName', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '物品规格', prop: 'specifications', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '单位', prop: 'unit', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '数量', prop: 'quantity', value: '', type: 'input', isRqd: true, disabled: true },
        { label: '物资用途', prop: 'purchasePurpose', value: '', type: 'input', isRqd: true, disabled: true },

        { label: '物资名称②', prop: 'purchaseName2', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '物品规格②', prop: 'specifications2', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '单位②', prop: 'unit2', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '数量②', prop: 'quantity2', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '物资用途②', prop: 'purchasePurpose2', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },

        { label: '物资名称③', prop: 'purchaseName3', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '物品规格③', prop: 'specifications3', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '单位③', prop: 'unit3', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '数量③', prop: 'quantity3', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '物资用途③', prop: 'purchasePurpose3', value: '', type: 'input', isShow: true, isRqd: false, disabled: true },
        { label: '预计金额', prop: 'estimateMoney', value: '', type: 'input', isRqd: false, disabled: true },
        { label: '预计需求时间', prop: 'demandTime', value: '', type: 'date', isRqd: false, disabled: true },
        { label: '申请备注', prop: 'remarks', value: '', type: 'textarea', disabled: true },
        { label: '实际金额', prop: 'actualMoney', value: '', type: 'input' },
        { label: '采购备注', prop: 'exp', value: '', type: 'textarea' }
      ]
    }
  },

  methods: {
    onSubmit() {
      if (this.type === 1) {
        this.$layer.close(this.layerid)
      } else {
        const reg = /(^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$)/
        if (!reg.test(this.fromValiData.actualMoney) && this.fromValiData.actualMoney) {
          this.$message.error('金额请输入正数且最多保留2位小数')
        } else {
          this.btnLoading = true
          getPurchaseModify(this.fromValiData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode2, this, this.layerid)
              this.$layer.close(this.layerid)
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
    this.fromValiData.id = this.params.applyId
    getPurchaseGetDataById(this.fromValiData).then(res => {
      this.fromValiData = res.result
      this.fromItemList.forEach(xdd => {
        if (this.fromValiData.purchaseName2) {
          if (this.purchase2.includes(xdd.prop)) {
            xdd.isShow = false
            xdd.isRqd = true
          }
        }
        if (this.fromValiData.purchaseName3) {
          if (this.purchase3.includes(xdd.prop)) {
            xdd.isShow = false
            xdd.isRqd = true
          }
        }
      })
    })
  },
  created() {
    if (this.type === 1) {
      this.fromItemList.forEach(item => {
        if (item.prop === 'actualMoney') {
          item.disabled = true
        }
        if (item.prop === 'exp') {
          item.disabled = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
