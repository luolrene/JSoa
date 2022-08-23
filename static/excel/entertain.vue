<!-- 付款审批 -->
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
        <col width="102" style="width:76.50pt;">
        <col width="43" style="width:32.25pt;">
        <col width="129" style="width:96.75pt;">
        <col width="100" style="width:75.00pt;">
        <col width="95" style="width:71.25pt;">
        <col width="105" style="width:78.75pt;">
        <col width="145" style="width:108.75pt;">
      </colgroup>
      <tbody>
        <tr height="38">
          <td class>招待申请人</td>
          <td colspan="2"></td>
          <td colspan="2">本公司参加人员</td>
          <td colspan="2"></td>
        </tr>
        <tr height="21">
          <td colspan="5">招待对象</td>
          <td colspan="2" rowspan="2">招待事由</td>
        </tr>
        <tr height="28">
          <td>姓名</td>
          <td colspan="3">单位</td>
          <td>职务</td>
        </tr>
        <tr height="32">
          <td></td>
          <td colspan="3"></td>
          <td></td>
          <td colspan="2" rowspan="5"></td>
        </tr>
        <tr height="32">
          <td></td>
          <td colspan="3"></td>
          <td></td>
        </tr>
        <tr height="32">
          <td class></td>
          <td colspan="3"></td>
          <td class></td>
        </tr>
        <tr height="32">
          <td class></td>
          <td colspan="3"></td>
          <td class></td>
        </tr>
        <tr height="32">
          <td class></td>
          <td colspan="3"></td>
          <td class></td>
        </tr>
        <tr height="23">
          <td rowspan="4">招待费用</td>
          <td>序号</td>
          <td>金额</td>
          <td colspan="4">招待项目</td>
        </tr>
        <tr height="30">
          <td>1</td>
          <td></td>
          <td colspan="4"></td>
        </tr>
        <tr height="30">
          <td>2</td>
          <td></td>
          <td colspan="4"></td>
        </tr>
        <tr height="30">
          <td>3</td>
          <td></td>
          <td colspan="4"></td>
        </tr>
        <tr height="30">
          <td colspan="2">费用合计</td>
          <td></td>
          <td class>已借支金额</td>
          <td class></td>
          <td class>尚需报销金额</td>
          <td class></td>
        </tr>
      </tbody>
    </table>
    <div class="foot">
      <span>部门经理：</span>
      <span class="ml10">分管领导：</span>

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
