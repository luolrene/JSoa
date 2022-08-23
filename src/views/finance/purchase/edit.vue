<template>
  <div class="operate-container">
    <fromItem ref="fromValiData" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="130">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
      <i class="el-icon-circle-plus-outline icon" @click="addInfo" v-if="type !==3"><span class="text">新增</span></i>
    </fromItem>
  </div>
</template>

<script>

import { getPurchaseAdd, getPurchaseApply, getPurchaseModify } from '@/api/finance/purchase.js'
import { TwoNumber, NumberIndex } from '@/utils/public.js'
export default {
  props: {
    params: Object,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      type: 1,
      userInfo: this.$store.getters.userInfo,
      fileList: [],
      newFromData: {},
      fromValiData: {
        userName: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupName: this.$store.getters.userInfo.groupName,
        groupId: this.$store.getters.userInfo.groupId
      },
      purchase2: ['purchaseName2', 'specifications2', 'purchasePurpose2', 'unit2', 'quantity2', 'demandTime2'],
      purchase3: ['purchaseName3', 'specifications3', 'purchasePurpose3', 'unit3', 'quantity3', 'demandTime3'],
      rules: {
        purchaseType: [{ required: true, message: '请选择物资类别', trigger: 'blur' }],
        purchaseName: [{ required: true, message: '请填写物资名称', trigger: 'blur' }],
        specifications: [{ required: true, message: '请填写物品规格', trigger: 'blur' }],
        purchasePurpose: [{ required: true, message: '请填写物资用途', trigger: 'blur' }],
        unit: [{ required: true, message: '请填写单位', trigger: 'blur' }],
        quantity: [{ required: true, message: '请填写数量', trigger: 'blur' }, { validator: NumberIndex, trigger: 'change' }],
        demandTime: [{ required: true, message: '请选择需求时间', trigger: 'blur' }],

        purchaseName2: [{ required: true, message: '请填写物资名称', trigger: 'blur' }],
        specifications2: [{ required: true, message: '请填写物品规格', trigger: 'blur' }],
        purchasePurpose2: [{ required: true, message: '请填写物资用途', trigger: 'blur' }],
        unit2: [{ required: true, message: '请填写单位', trigger: 'blur' }],
        quantity2: [{ required: true, message: '请填写数量', trigger: 'blur' }, { validator: NumberIndex, trigger: 'change' }],
        demandTime2: [{ required: true, message: '请选择需求时间', trigger: 'blur' }],

        purchaseName3: [{ required: true, message: '请填写物资名称', trigger: 'blur' }],
        specifications3: [{ required: true, message: '请填写物品规格', trigger: 'blur' }],
        purchasePurpose3: [{ required: true, message: '请填写物资用途', trigger: 'blur' }],
        unit3: [{ required: true, message: '请填写单位', trigger: 'blur' }],
        quantity3: [{ required: true, message: '请填写数量', trigger: 'blur' }, { validator: NumberIndex, trigger: 'change' }],
        demandTime3: [{ required: true, message: '请填写需求时间', trigger: 'blur' }],
        estimateMoney: [{ required: true, message: '请填写预计金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }]
      },
      fromItemList: [
        { label: '申请人', prop: 'userName', value: '', type: 'input', isRqd: true, disabled: true },
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
          isRqd: true
        },
        { label: '物资名称', prop: 'purchaseName', value: '', type: 'input', isRqd: true },
        { label: '物品规格', prop: 'specifications', value: '', type: 'input', isRqd: true },
        { label: '单位', prop: 'unit', value: '', type: 'input', isRqd: true },
        { label: '数量', prop: 'quantity', value: '', type: 'input', isRqd: true },
        { label: '物资用途', prop: 'purchasePurpose', value: '', type: 'input', isRqd: true },
        { label: '预计需求时间', prop: 'demandTime', value: '', type: 'datetimes', disabledDate: true, isRqd: true },
        { label: '物资名称②', prop: 'purchaseName2', value: '', type: 'input', isRqd: true },
        { label: '物品规格②', prop: 'specifications2', value: '', type: 'input', isRqd: true },
        { label: '单位②', prop: 'unit2', value: '', type: 'input', isRqd: true },
        { label: '数量②', prop: 'quantity2', value: '', type: 'input', isRqd: true },
        { label: '物资用途②', prop: 'purchasePurpose2', value: '', type: 'input', isRqd: true },
        { label: '预计需求时间②', prop: 'demandTime2', value: '', type: 'datetimes', disabledDate: true, isRqd: true },
        { label: '物资名称③', prop: 'purchaseName3', value: '', type: 'input', isRqd: true },
        { label: '物品规格③', prop: 'specifications3', value: '', type: 'input', isRqd: true },
        { label: '单位③', prop: 'unit3', value: '', type: 'input', isRqd: true },
        { label: '数量③', prop: 'quantity3', value: '', type: 'input', isRqd: true },
        { label: '物资用途③', prop: 'purchasePurpose3', value: '', type: 'input', isRqd: true },
        { label: '预计需求时间③', prop: 'demandTime3', value: '', type: 'datetimes', disabledDate: true, isRqd: true },
        { label: '预计金额', prop: 'estimateMoney', value: '', type: 'input', isRqd: true },
        { label: '备注', prop: 'remarks', value: '', type: 'textarea' }
      ]
    }
  },
  watch: {
    'type': {
      handler: function (newV) {
        this.fromItemList.forEach(item => {
          if (newV === 2 || newV === 3) {
            if (this.purchase2.includes(item.prop)) {
              item.isRqd = true
              item.isShow = false
            }
          }
          if (newV === 3) {
            if (this.purchase3.includes(item.prop)) {
              item.isRqd = true
              item.isShow = false
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
        getPurchaseModify(this.fromValiData)
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
        if (this.datas) {
          getPurchaseAdd(this.fromValiData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
              this.newFromData = res.result
            })
            .then(() => {
              getPurchaseApply(this.newFromData)
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
          getPurchaseAdd(this.fromValiData)
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
    addInfo() {
      this.type += 1
    }
  },
  mounted() {
    const all = this.purchase2.concat(this.purchase3)
    this.fromItemList.forEach(item => {
      if (this.type === 1) {
        if (all.includes(item.prop)) {
          item.isRqd = false
          item.isShow = true
        }
      }
    })
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
.icon {
  position: relative;
  top: -178px;
  left: 0;
  font-size: 18px;
  color: #0195db;
  cursor: pointer;
  .text {
    margin-left: 3px;
    font-size: 14px;
  }
}
</style>
