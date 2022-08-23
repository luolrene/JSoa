<template>
  <div class='operate-container'>
    <el-descriptions title='申请详情' :column='3' :size='size' border>
      <el-descriptions-item label='申请人'>{{params.createUserName}}</el-descriptions-item>
      <el-descriptions-item label='部门'>{{params.groupName}}</el-descriptions-item>
      <el-descriptions-item label='采购编号'>{{params.purchaseNumber}}</el-descriptions-item>
      <el-descriptions-item label='物资类别'>{{params.purchaseType}}</el-descriptions-item>
      <el-descriptions-item label='物资名称'>{{params.purchaseName}}</el-descriptions-item>
      <el-descriptions-item label='物品规格'>{{params.specifications}}</el-descriptions-item>
      <el-descriptions-item label='单位'>{{params.unit}}</el-descriptions-item>
      <el-descriptions-item label='数量'>{{params.quantity}}</el-descriptions-item>
      <el-descriptions-item label='物资用途'>{{params.purchasePurpose}}</el-descriptions-item>
      <el-descriptions-item label='物资名称②' v-if="params.purchaseName2">{{params.purchaseName2}}</el-descriptions-item>
      <el-descriptions-item label='物品规格②' v-if="params.specifications2">{{params.specifications2}}</el-descriptions-item>
      <el-descriptions-item label='单位②' v-if="params.unit2">{{params.unit2}}</el-descriptions-item>
      <el-descriptions-item label='数量②' v-if="params.quantity2">{{params.quantity2}}</el-descriptions-item>
      <el-descriptions-item label='物资用途②' v-if="params.purchasePurpose2">{{params.purchasePurpose2}}</el-descriptions-item>
      <el-descriptions-item label='物资名称③' v-if="params.purchaseName3">{{params.purchaseName3}}</el-descriptions-item>
      <el-descriptions-item label='物品规格③' v-if="params.specifications3">{{params.specifications3}}</el-descriptions-item>
      <el-descriptions-item label='单位③' v-if="params.unit3">{{params.unit3}}</el-descriptions-item>
      <el-descriptions-item label='数量③' v-if="params.quantity3">{{params.quantity3}}</el-descriptions-item>
      <el-descriptions-item label='物资用途③' v-if="params.purchasePurpose3">{{params.purchasePurpose3}}</el-descriptions-item>
      <el-descriptions-item label='需求时间'>{{params.demandTime}}</el-descriptions-item>
      <el-descriptions-item label='预计金额'>{{params.estimateMoney}}</el-descriptions-item>
      <el-descriptions-item label='实际金额'>{{params.actualMoney}}</el-descriptions-item>
      <el-descriptions-item label='申请备注'>{{params.remarks}}</el-descriptions-item>
      <el-descriptions-item label='采购备注'>{{params.exp}}</el-descriptions-item>
    </el-descriptions>
    <div class='modular' style='align-items: center;margin-top:15px;'>
      <div class='title'>申请附件：</div>
      <div>
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
      </div>
    </div>
    <div class='modular' style='align-items:  center;margin-top:15px;'>
      <div class='title'>采购附件：</div>
      <div>
        <div v-if='fileList1.length === 0'>无</div>
        <fileList :fileList='fileList1' style='padding:0;' v-else></fileList>
      </div>
    </div>

  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import { getKnowledgePointsGetFile } from '@/api/file.js'
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
      fileList1: [],
      AssetsData: {}
    }
  },
  methods: {
    getFileList() {
      getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode }).then(res => {
        this.fileList = res.result
      }
      )
    },
    getFileList1() {
      getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode2 }).then(res => {
        this.fileList1 = res.result
      }
      )
    }
  },
  mounted() {
    this.getFileList()
    this.getFileList1()
  },
  created() { }
}
</script>
<style lang='scss'>

</style>
