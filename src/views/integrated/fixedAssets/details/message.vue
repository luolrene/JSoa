<!-- 资产明细 -->
<template>
  <div class='operate-container contractDetail'>
    <el-descriptions title='资产明细' :column='3' :size='size' border>
      <el-descriptions-item label="资产名称">{{params.name}} </el-descriptions-item>
      <el-descriptions-item label="资产类型">{{params.typeNameAll}} </el-descriptions-item>
      <el-descriptions-item label="资产编号">{{params.assetNumber}} </el-descriptions-item>
      <el-descriptions-item label="标准型号">{{params.standardModel}} </el-descriptions-item>
      <el-descriptions-item label="来源">{{params.sourceName}} </el-descriptions-item>
      <el-descriptions-item label="供应商"> <span @click="sourceData" class="name"> {{params.supplierName}}</span> </el-descriptions-item>
      <el-descriptions-item label="入库时间">{{params.warehousingTime}} </el-descriptions-item>
      <el-descriptions-item label="金额">{{params.amountOfMoney}} </el-descriptions-item>
      <el-descriptions-item label="状态">{{params.stateName}} </el-descriptions-item>
      <el-descriptions-item label="部门">{{params.groupNameAll}} </el-descriptions-item>
      <el-descriptions-item label="物品所在地">{{params.location}} </el-descriptions-item>
      <el-descriptions-item label="有无维保">{{params.maintenanceName}} </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top:20px;" v-if="params.maintenance">
      <el-descriptions class='margin-top' title='维保信息' :column='3' :size='size' border>
        <el-descriptions-item label="供应商"> <span @click="sourceData" class="name"> {{AssetsData.name}}</span></el-descriptions-item>
        <el-descriptions-item label="联系人"> {{AssetsData.contacts}} </el-descriptions-item>
        <el-descriptions-item label="联系电话"> {{AssetsData.telephone}} </el-descriptions-item>
        <el-descriptions-item label="维保到期">{{AssetsData.maintenanceTime}} </el-descriptions-item>
        <el-descriptions-item label="维保信息"> {{AssetsData.maintenanceInformation}} </el-descriptions-item>
        <el-descriptions-item label="负责人"> {{AssetsData.personInCharge}} </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class='modular' style='display: flex;align-items: center;' v-if="params.maintenance">
      <div class='title'>附件：</div>
      <div class='content'>
        <div v-if='fileList.length === 0'>无</div>
        <fileList :fileList='fileList' style='padding:0;' v-else></fileList>
      </div>
    </div>
  </div>
</template>

<script>
import source from '../source.vue'
import fileList from '../../../common/fileList.vue'
import { getKnowledgePointsGetFile } from '@/api/file.js'
import { getAssetsMaintenanceGetDataByAssetId } from '@/api/integrated/fixedAssets.js'
export default {
  components: {
    fileList
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      loading: false,
      size: '',
      fileList: [],
      AssetsData: {}
    }
  },
  methods: {
    getAssetsMaintenance() {
      let obj = {}
      obj.assetId = this.params.id
      obj.assetType = '1'
      getAssetsMaintenanceGetDataByAssetId(obj).then(res => {
        this.AssetsData = res.result
        getKnowledgePointsGetFile({ onlyCode: this.AssetsData.onlyCode }).then(
          res => {
            this.fileList = res.result
          }
        )
      })
    },
    // 供应商
    sourceData() {
      this.$layer.iframe({
        content: {
          content: source, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '供应商详情',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    if (this.params.maintenance) {
      this.getAssetsMaintenance()
    }
  },
  created() { }
}
</script>
<style lang='scss'>
.contractDetail {
  .my-label {
    background-color: #e1f3d8 !important;
  }
}
</style>
