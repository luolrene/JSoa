<template>
  <div class='operate-container'>
    <el-descriptions title='申请详情' :column='3' :size='size' border>
      <el-descriptions-item label='申请人'>{{params.name}}</el-descriptions-item>
      <el-descriptions-item label='部门'>{{params.groupName}}</el-descriptions-item>
      <el-descriptions-item label='付款申请类别'>{{params.typeName}}</el-descriptions-item>
      <el-descriptions-item label='合同号' v-if='params.contractNumber'>{{params.contractNumber}}</el-descriptions-item>
      <el-descriptions-item label='合同金额' v-if='params.contractAmount'>{{params.contractAmount}}</el-descriptions-item>
      <el-descriptions-item label='付款申请金额'>{{params.paymentMoney}}</el-descriptions-item>
      <el-descriptions-item label='申请原因'>{{params.paymentCause}}</el-descriptions-item>
      <el-descriptions-item label='申请需求时间'>{{params.paymentDemandTime}}</el-descriptions-item>
      <el-descriptions-item label='关联采购申请' v-if='params.associatedApplication'>{{params.associatedApplication}}</el-descriptions-item>
      <el-descriptions-item label='关联报销申请' v-if='params.reimbursementName' >{{params.reimbursementName}}</el-descriptions-item>

      <el-descriptions-item label='支付方式'>{{params.paymentTypeName}}</el-descriptions-item>
      <el-descriptions-item label='开户人' v-if="params.bankUser">{{params.bankUser}}</el-descriptions-item>
      <el-descriptions-item label='开户银行' v-if="params.bank">{{params.bank}}</el-descriptions-item>
      <el-descriptions-item label='开户支行' v-if="params.bankSubBranch">{{params.bankSubBranch}}</el-descriptions-item>
      <el-descriptions-item label='银行账号' v-if="params.bankAccount">{{params.bankAccount}}</el-descriptions-item>
      <el-descriptions-item label='备注' v-if="params.exp">{{params.exp}}</el-descriptions-item>
    </el-descriptions>
    <div class='modular' style='display: flex;align-items: center;margin-top:15px;'>
      <div class='title'>附件：</div>
      <div class='content'>
        <div v-if='fileList.length === 0'>无</div>
        <fileList :fileList='fileList' style='padding:0;' v-else></fileList>
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
      AssetsData: {}
    }
  },
  methods: {},
  mounted() {
    this.params.paymentType === '1' ? this.params.paymentTypeName = '现金' : this.params.paymentTypeName = '银行'
    getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode }).then(res => {
      this.fileList = res.result
    })
  },
  created() { }
}
</script>
<style lang='scss'>
</style>
