<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { validatePhoneTwo } from '@/utils/public.js'
import {
  getAssetsMaintenanceAddOrModify,
  getAssetsMaintenanceGetDataByAssetId
} from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      fromValiData: {
        name: '',
        contacts: '',
        telephone: '',
        maintenanceTime: '',
        maintenanceInformation: '',
        personInCharge: ''
      },
      rules: {
        telephone: [{ required: true, message: '请填写联系电话', trigger: 'blur' }, { validator: validatePhoneTwo, trigger: 'change' }]
      },
      fromItemList: [
        { label: '供应商', prop: 'name', value: '', type: 'input', disabled: true },
        { label: '联系人', prop: 'contacts', value: '', type: 'input' },
        { label: '联系电话', prop: 'telephone', value: '', type: 'input', isRqd: true },
        { label: '维保到期', prop: 'maintenanceTime', value: '', type: 'date' },
        { label: '维保信息', prop: 'maintenanceInformation', value: '', type: 'textarea' },
        { label: '检定时间', prop: 'testTime', value: '', type: 'input' },
        { label: '负责人', prop: 'personInCharge', value: '', type: 'input' }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getAssetsMaintenanceAddOrModify(this.fromValiData).then(res => {
        if (this.$refs.myUpload.uploadList.length > 0) {
          this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
        } else {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.assetType = '1'
      this.fromValiData.assetId = this.params.id
      this.fromValiData.name = this.params.supplierName
      let obj = {}
      obj.assetId = this.params.id
      obj.assetType = '1'
      if (this.params.maintenance) {
        getAssetsMaintenanceGetDataByAssetId(obj).then(res => {
          this.fromValiData = res.result
        })
      }
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
