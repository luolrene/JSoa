<!-- 付款审批单 -->
<template>
  <div class="form" ref="table">
    <img src="../../static/img/login/logo_1.png" alt="" width="130">
    <div class="title">
      <div class="firm">重庆市九升检测技术有限公司</div>
      <div class="name">
        <span class="type">付款审批单</span>
        <span class="time">年 月 日</span>
      </div>
    </div>
    <table style="width:534.77pt;text-align:center;">
      <colgroup>
        <col width="40" style="width:30.00pt;">
        <col width="100" style="width:75.00pt;">
        <col width="48" style="width:36.00pt;">
        <col width="55" style="width:41.25pt;">
        <col width="209" style="width:156.75pt;">
        <col width="29" style="width:21.75pt;" span="2">
        <col width="29" style="width:21.75pt;" span="4">
        <col width="29" style="width:21.75pt;" span="3">
      </colgroup>
      <tbody>
        <tr height="33">
          <td colspan="14">
            <span>部门：</span>
            <span class="ml50">付款申请人：</span>
            <span class="ml50">需要办理时间：</span>
            <span class="ml50">附件张数：</span>
          </td>
        </tr>
        <tr height="20" class="et10">
          <td colspan="5" rowspan="2">用 途 说 明</td>
          <td colspan="9">金 额</td>
        </tr>
        <tr height="20" class="et10">
          <td>百</td>
          <td>十</td>
          <td>万</td>
          <td>千</td>
          <td>百</td>
          <td>十</td>
          <td>元</td>
          <td>角</td>
          <td>分</td>
        </tr>
        <!-- 第一排 -->
        <tr height="40" class="et10">
          <td colspan="5"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- 第二排 -->
        <tr height="40" class="et10">
          <td colspan="5"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr height="40" class="et10">
          <td colspan="5"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr height="40" class="et10">
          <td colspan="5"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr height="46" class="et10">
          <td colspan="5" class="et16">合计金额（人民币大写）：</td>
          <td class="et16"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr height="36">
          <td colspan="14" class="et16">支付方式: 现金（ ） 银行（ ）</td>
        </tr>
        <tr height="40">
          <td colspan="14" class="et16">
            <span>开户单位（人）：</span>
            <span class="ml50">开户银行：</span>
            <span class="ml50">银行账号：</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="foot">
      <span>部门经理：</span>
      <span class="ml10">分管领导：</span>
      <span class="ml10">财务复核：</span>
      <span class="ml10">财务经理：</span>
      <span class="ml10">管理分管领导：</span>
    </div>
    <el-button size="mini" class="el-icon-printer btn" @click="printJson">打印</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    printJson() {
      let btn = document.querySelector('.btn')
      btn.style.display = 'none'
      this.$print(this.$refs.table)
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  position: relative;
  margin: 20px auto;
}
.btn {
  margin-top: 20px;
  color: #0195db;
}
img {
  position: absolute;
  top: 0;
  left: 0;
}
.title {
  line-height: 30px;
}
.firm {
  width: 700px;
  letter-spacing: 3px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}
.name {
  width: 700px;
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  .time {
    margin-left: 220px;
    margin-right: 50px;
  }
}
.foot {
  margin-top: 10px;
  width: 600px;
  text-align: center;
}
table {
  border-top: 1px solid #333;
  border-left: 1px solid #333;
  border-spacing: 0;
  width: 100%;
}
table td {
  border-bottom: 1px solid #333;
  border-right: 1px solid #333;
  font-size: 13px;
  padding: 5px;
}
.ml50 {
  margin-left: 50px;
}
.ml20 {
  margin-left: 50px;
}
</style>
