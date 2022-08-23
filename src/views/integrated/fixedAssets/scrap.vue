<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label='附件上传:' slot='upload' v-if="!showData">
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>

  </div>
</template>

<script>
import { getAssetsDetailsApply } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    params: Object,
    type: String,
    showData: Boolean,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      fromValiData: {
        applyType: '',
        scrapMoney: ''
      },
      rules: {
        applyRemarks: [{ required: true, message: '请填写申请备注', trigger: 'blur' }],
        scrapReason: [{ required: true, message: '请填写报废原因', trigger: 'blur' }],
        assessmentType: [{ required: true, message: '请选择报废评估', trigger: 'blur' }],
        assessmentRemarks: [{ required: true, message: '请填写评估', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '申请类型',
          prop: 'applyType',
          value: '',
          type: 'select',
          data: [
            { name: '归还', id: '1' },
            { name: '维修', id: '2' },
            { name: '报废', id: '3' },
            { name: '报废评估', id: '4' }
          ],
          disabled: true
        },
        { label: '申请备注', prop: 'applyRemarks', value: '', type: 'textarea', isShow: true, isRqd: false },
        { label: '资产金额', prop: 'scrapMoney', value: '', type: 'input', disabled: true, isShow: true },
        { label: '报废原因', prop: 'scrapReason', value: '', type: 'textarea', isShow: true, isRqd: false },
        { label: '报废评估', prop: 'assessmentType', value: '', type: 'select', data: [{ name: '有价值', id: '2' }, { name: '无价值', id: '3' }], isShow: true, isRqd: false },
        { label: '评估备注', prop: 'assessmentRemarks', value: '', type: 'textarea', isShow: true, isRqd: false }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getAssetsDetailsApply(this.fromValiData)
        .then(res => {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.applyType = this.type
      this.fromValiData.detailsId = this.params.id
      this.fromValiData.detailsName = this.params.name
    }
    // 归还
    if (this.type === '1') {
      this.fromItemList.forEach(item => {
        if (item.prop === 'applyRemarks') {
          item.isShow = false
          item.isRqd = true
        }
      })
    }
    // 维修
    if (this.type === '2') {
      this.fromItemList.forEach(item => {
        if (item.prop === 'applyRemarks') {
          item.isShow = false
          item.isRqd = true
        }
      })
    }
    // 报废申请
    if (this.type === '3') {
      this.fromValiData.scrapMoney = this.params.amountOfMoney
      if (this.params) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'scrapMoney') {
            item.isShow = false
          }
          if (item.prop === 'scrapReason') {
            item.isRqd = true
            item.isShow = false
          }
        })
      }
    }
    // 报废申请
    if (this.showData === true) {
      this.fromValiData.scrapMoney = this.params.amountOfMoney
      if (this.params) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'scrapMoney') {
            item.isShow = false
          }
          if (item.prop === 'scrapReason') {
            item.isRqd = true
            item.isShow = false
            item.disabled = true
          }
        })
      }
    }
    // 报废评估
    if (this.type === '4') {
      this.fromValiData.scrapMoney = this.params.amountOfMoney
      if (this.params) {
        this.fromItemList.forEach(item => {
          if (item.prop === 'scrapMoney') {
            item.isShow = false
          }
          if (item.prop === 'scrapReason') {
            item.isRqd = true
            item.isShow = false
            item.disabled = true
          }
          if (item.prop === 'assessmentType') {
            item.isRqd = true
            item.isShow = false
          }
          if (item.prop === 'assessmentRemarks') {
            item.isRqd = true
            item.isShow = false
          }
        })
      }
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
