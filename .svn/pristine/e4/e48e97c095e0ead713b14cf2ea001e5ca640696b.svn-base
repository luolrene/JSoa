<template>
  <div>
    <el-descriptions title="资产信息" :column='1' align="center" border>
      <el-descriptions-item label="资产名称">{{datas.name}}</el-descriptions-item>
      <el-descriptions-item label="资产类别">{{datas.typeNameAll}}</el-descriptions-item>
      <el-descriptions-item label="资产编号">{{datas.assetNumber}}</el-descriptions-item>
      <el-descriptions-item label="标准型号">{{datas.standardModel}}</el-descriptions-item>
      <el-descriptions-item label="来源">{{datas.sourceName}}</el-descriptions-item>
      <el-descriptions-item label="供应商">{{datas.supplierName}}</el-descriptions-item>
      <el-descriptions-item label="入库时间">{{datas.warehousingTime}}</el-descriptions-item>
      <el-descriptions-item label="金额">{{datas.amountOfMoney}}</el-descriptions-item>
      <el-descriptions-item label="使用部门">{{datas.groupNameAll}}</el-descriptions-item>
      <el-descriptions-item label="资产状态">{{datas.stateName}}</el-descriptions-item>
      <el-descriptions-item label="物品所在地">{{datas.location}} </el-descriptions-item>
      <el-descriptions-item label="维保信息">{{datas.maintenanceName}}</el-descriptions-item>
      </el-descriptions>
  </div>
</template>

<script>
import { getQrCodeAssetsDetailsGetDataById } from '@/api/integrated/fixedAssets'
export default {
  data() {
    return {
      qrData: {},
      datas: null
    }
  },
  methods: {
    getQrData() {
      getQrCodeAssetsDetailsGetDataById(this.qrData).then(res => {
        if (res.result.source === '1') {
          res.result.sourceName = '购入'
        } else if (res.result.source === '2') {
          res.result.sourceName = '捐赠'
        } else if (res.result.source === '3') {
          res.result.sourceName = '租赁'
        } else if (res.result.source === '4') {
          res.result.sourceName = '其他'
        }
        if (res.result.maintenance) {
          res.result.maintenanceName = '有'
        } else {
          res.result.maintenanceName = '无'
        }
        this.datas = res.result
      })
    }
  },
  mounted() {
    this.getQrData()
  },
  created() {
    this.qrData = this.$route.query
  }
}
</script>

<style scoped>
</style>
