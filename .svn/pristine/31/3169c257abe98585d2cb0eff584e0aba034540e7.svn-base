<!-- 资产明细 -->
<template>
  <div class='operate-container contractDetail'>
    <el-descriptions title='报销明细' :column='3' :size='size' border>
      <el-descriptions-item label='借款人'>{{params.userName}}</el-descriptions-item>
      <el-descriptions-item label='部门'>{{params.groupName}}</el-descriptions-item>
      <el-descriptions-item label='报销类型'>{{params.accountTypeName}}</el-descriptions-item>
      <el-descriptions-item label='报销编号'>{{params.loanNumber}}</el-descriptions-item>
      <el-descriptions-item label='报销金额'>{{params.detailedSumMoney}}</el-descriptions-item>
      <el-descriptions-item label='同行人' v-if="params.counterpartsUser">{{params.counterpartsUser}}</el-descriptions-item>
      <el-descriptions-item label='出差事由' v-if="params.travelReason">{{params.travelReason}}</el-descriptions-item>
      <el-descriptions-item label='报销需求时间'>{{params.accountTime}}</el-descriptions-item>
      <el-descriptions-item label='关联客户' v-if="params.customerName">{{params.customerName}}</el-descriptions-item>
      <el-descriptions-item label='关联项目' v-if="params.contractName">{{params.contractName}}</el-descriptions-item>
      <el-descriptions-item label='关联采购' v-if="params.purchaseNumber">{{params.purchaseNumber}}</el-descriptions-item>
      <el-descriptions-item label='是否冲账'>{{params.reverseEntryName}}</el-descriptions-item>
      <el-descriptions-item label='报销方式'>{{params.accountModeName}}</el-descriptions-item>
      <el-descriptions-item label='关联借款' v-if="params.loanName">{{params.loanName}}</el-descriptions-item>
      <el-descriptions-item label='关联付款' v-if="params.paymentName">{{params.paymentName}}</el-descriptions-item>
      <el-descriptions-item label='开户人' v-if="params.bankUser">{{params.bankUser}}</el-descriptions-item>
      <el-descriptions-item label='开户银行' v-if="params.bank">{{params.bank}}</el-descriptions-item>
      <el-descriptions-item label='开户支行' v-if="params.bankSubBranch">{{params.bankSubBranch}}</el-descriptions-item>
      <el-descriptions-item label='银行账号' v-if="params.bankAccount">{{params.bankAccount}}</el-descriptions-item>
      <el-descriptions-item label='状态'>{{params.stateName}}</el-descriptions-item>
      <el-descriptions-item label='备注'>{{params.exp}}</el-descriptions-item>
      <el-descriptions-item label='审批通过时间'>{{datas.submitTime}}</el-descriptions-item>
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
import fileList from '../../../common/fileList.vue'
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
      datas: {},
      fileList: [],
      fromValiData: {
        pageSize: 1,
        pageNow: 1
      }
    }
  },
  methods: {
  },
  mounted() {
    if (this.params) {
      this.fromValiData.id = this.params.id
    }
    // 获取附件
    getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode }).then(res => {
      this.fileList = res.result
    })
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
