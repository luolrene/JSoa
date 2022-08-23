<template>
  <div class='operate-container'>
    <el-descriptions title='申请详情' :column='3' :size='size' border>
      <el-descriptions-item label='借款人'>{{params.name}}</el-descriptions-item>
      <el-descriptions-item label='部门'>{{params.groupName}}</el-descriptions-item>
      <el-descriptions-item label='借款类别'>{{params.typeName}}</el-descriptions-item>
      <el-descriptions-item label='状态'>{{params.stateName}}</el-descriptions-item>
      <el-descriptions-item label='合同号' v-if='params.contractNumber'>{{params.contractNumber}}</el-descriptions-item>
      <el-descriptions-item label='合同金额' v-if='params.contractAmount'>{{params.contractAmount}}</el-descriptions-item>
      <el-descriptions-item label='借款金额'>{{params.borrowingBalance}}</el-descriptions-item>
      <el-descriptions-item label='借款原因'>{{params.borrowingCause}}</el-descriptions-item>
      <el-descriptions-item label='借款需求时间'>{{params.borrowingDemandTime}}</el-descriptions-item>
      <el-descriptions-item label='预计还款时间' v-if='params.repaymentTime'>{{params.repaymentTime}}</el-descriptions-item>
      <el-descriptions-item label='关联采购申请' v-if='params.associatedApplication'>{{params.associatedApplication}}</el-descriptions-item>
      <el-descriptions-item label='支付方式'>{{params.paymentName}}</el-descriptions-item>
      <el-descriptions-item label='开户人' v-if="params.bankUser">{{params.bankUser}}</el-descriptions-item>
      <el-descriptions-item label='开户银行' v-if="params.bank">{{params.bank}}</el-descriptions-item>
      <el-descriptions-item label='开户支行' v-if="params.bankSubBranch">{{params.bankSubBranch}}</el-descriptions-item>
      <el-descriptions-item label='银行账号' v-if="params.bankAccount">{{params.bankAccount}}</el-descriptions-item>
      <el-descriptions-item label='未冲账原因' v-if="params.writeOffRemarks">{{params.writeOffRemarks}}</el-descriptions-item>
      <el-descriptions-item label='是否延期'>{{params.delayStateName}}</el-descriptions-item>
      <el-descriptions-item label='延期时间' v-if="params.delayTime">{{params.delayTime}}</el-descriptions-item>
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
    getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode }).then(res => {
      this.fileList = res.result
    })
  },
  created() { }
}
</script>
<style lang='scss'>
</style>
