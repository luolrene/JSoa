<template>
  <div class="operate-container">
    <el-descriptions title='基础信息' :column='3' size="medium">
      <el-descriptions-item label='姓名'>{{params.name}}</el-descriptions-item>
      <el-descriptions-item label='工号'>{{params.jobNumber}}</el-descriptions-item>
      <el-descriptions-item label='单位'>{{params.companyName}}</el-descriptions-item>
      <el-descriptions-item label='性别'>{{params.sex}}</el-descriptions-item>
      <el-descriptions-item label='出生日期'>{{params.birthTime}}</el-descriptions-item>
      <el-descriptions-item label='联系电话'>{{params.mobile}}</el-descriptions-item>
      <el-descriptions-item label='电子邮箱'>{{params.mail}}</el-descriptions-item>
      <el-descriptions-item label='部门'>{{params.groupName}}</el-descriptions-item>
      <el-descriptions-item label='角色'>{{params.roleName}}</el-descriptions-item>
      <el-descriptions-item label='行政职级'>{{params.administrativeRankName}}</el-descriptions-item>
      <el-descriptions-item label='技术职级'>{{params.technicalRankName}}</el-descriptions-item>
      <el-descriptions-item label='市场职级'>{{params.marketRankName}}</el-descriptions-item>
      <el-descriptions-item label='在职状态'>{{params.onTheJobStatusName}}</el-descriptions-item>
      <el-descriptions-item label='用户级别'>{{params.level}}</el-descriptions-item>
      <el-descriptions-item label='申请公租房'>{{params.publicHomeName}}</el-descriptions-item>
      <el-descriptions-item label='职称等级'>{{params.rankLevName}}</el-descriptions-item>
      <el-descriptions-item label='职称名称'>{{params.rankLevName}}</el-descriptions-item>
      <el-descriptions-item label='资格证'>{{params.certification}}</el-descriptions-item>
      <el-descriptions-item label='环境持证'>{{params.environment}}</el-descriptions-item>
      <el-descriptions-item label='农业持证'>{{params.agriculture}}</el-descriptions-item>
      <el-descriptions-item label='职卫持证'>{{params.position}}</el-descriptions-item>
      <el-descriptions-item label='原工作单位'>{{params.oldUnit}}</el-descriptions-item>
      <el-descriptions-item label='原工作岗位'>{{params.oldPost}}</el-descriptions-item>
      <el-descriptions-item label='原工作年限'>{{params.workingYear}}</el-descriptions-item>
      <el-descriptions-item label='参保状态'>{{params.insuredStateName}}</el-descriptions-item>
      <el-descriptions-item label='参保时间'>{{params.insuredTime}}</el-descriptions-item>
      <el-descriptions-item label='入职日期'>{{params.inductionTime}}</el-descriptions-item>
      <el-descriptions-item label='预计转正日期'>{{params.formalTime}}</el-descriptions-item>
      <el-descriptions-item label='实际转正日期'>{{params.formalTimeActual}}</el-descriptions-item>
      <el-descriptions-item label='离职日期'>{{params.quitTime}}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title='个人信息' :column='3' size="medium">
      <el-descriptions-item label='籍贯'>{{params.nativePlace}}</el-descriptions-item>
      <el-descriptions-item label='民族'>{{params.nation}}</el-descriptions-item>
      <el-descriptions-item label='政治面貌'>{{params.politicalOutlookName}}</el-descriptions-item>
      <el-descriptions-item label='婚姻状况'>{{params.maritalStatusName}}</el-descriptions-item>
      <el-descriptions-item label='身份证号'>{{params.idNumber}}</el-descriptions-item>
      <el-descriptions-item label='证件有效期'>{{params.idNumberTime}}</el-descriptions-item>
      <el-descriptions-item label='户口所在地'>{{params.registeredResidence}}</el-descriptions-item>
      <el-descriptions-item label='户口性质'>{{params.registeredName}}</el-descriptions-item>
      <el-descriptions-item label='户口地址'>{{params.maritalStatusAddress}}</el-descriptions-item>
      <el-descriptions-item label='通信地址'>{{params.mailingAddress}}</el-descriptions-item>
      <el-descriptions-item label='毕业学校'>{{params.school}}</el-descriptions-item>
      <el-descriptions-item label='最高学历'>{{params.educationName}}</el-descriptions-item>
      <el-descriptions-item label='毕业专业'>{{params.professionalDirection}}</el-descriptions-item>
      <el-descriptions-item label='毕业时间'>{{params.graduate}}</el-descriptions-item>
      <el-descriptions-item label='银行账号'>{{params.bankCode}}</el-descriptions-item>
      <el-descriptions-item label='紧急联系人'>{{params.relative}}</el-descriptions-item>
      <el-descriptions-item label='紧急联系人电话'>{{params.relativePhone}}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title='合同信息' :column='3' size="medium">
      <el-descriptions-item label='用工形式'>{{params.contractTypeName}}</el-descriptions-item>
      <el-descriptions-item label='第一次签订开始日期'>{{params.fristContractStartTime}}</el-descriptions-item>
      <el-descriptions-item label='第一次签订结束日期'>{{params.fristContractEndTime}}</el-descriptions-item>
      <el-descriptions-item label='第二次签订开始日期' v-if="params.secondContractStartTime">{{params.secondContractStartTime}}</el-descriptions-item>
      <el-descriptions-item label='第二次签订结束日期' v-if="params.secondContractEndTime">{{params.secondContractEndTime}}</el-descriptions-item>
      <el-descriptions-item label='第三次签订开始日期' v-if="params.thirdContractStartTime">{{params.thirdContractStartTime}}</el-descriptions-item>
      <el-descriptions-item label='第三次签订结束日期' v-if="params.thirdContractEndTime">{{params.thirdContractEndTime}}</el-descriptions-item>
      <el-descriptions-item label='第四次签订开始日期' v-if="params.fourthContractStartTime">{{params.fourthContractStartTime}}</el-descriptions-item>
      <el-descriptions-item label='第四次签订结束日期' v-if="params.fourthContractEndTime">{{params.fourthContractEndTime}}</el-descriptions-item>
      <el-descriptions-item label='第五次签订开始日期' v-if="params.fifthContractStartTime">{{params.fifthContractStartTime}}</el-descriptions-item>
      <el-descriptions-item label='第五次签订结束日期' v-if="params.fifthContractEndTime">{{params.fifthContractEndTime}}</el-descriptions-item>
      <el-descriptions-item label='第六次签订开始日期' v-if="params.sixthContractStartTime">{{params.sixthContractStartTime}}</el-descriptions-item>
      <el-descriptions-item label='第六次签订结束日期' v-if="params.sixthContractEndTime">{{params.sixthContractEndTime}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
// import nations from '../../../utils/nation.js' // 民族
// import options from '../../../utils/country-data.js' // 籍贯
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      size: ''
    }
  },
  mounted() { }
}
</script>

<style  scoped lang="scss">
>>> .el-descriptions__body .el-descriptions__table {
  height: 40px;
}
>>> .el-descriptions__header {
  margin: 10px 0;
}
>>> .el-descriptions__title {
  font-size: 24px;
}
</style>
