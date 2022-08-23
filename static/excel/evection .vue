<!-- 出差费用报销单 -->
<template>
  <div class="form" ref="table">
    <img src="../../static/img/login/logo_1.png" alt="" width="130">
    <div class="title">
      <div class="firm">重庆市九升检测技术有限公司</div>
      <div class="name">
        <span class="type">差旅费用报销单</span>
        <span class="time">年 月 日</span>
      </div>
    </div>
    <table style="width:678.77pt;text-align:center;">
      <colgroup>
        <col width="99" style="width:74.25pt;">
        <col width="92" style="width:69.00pt;" span="2">
        <col width="89" style="width:66.75pt;">
        <col width="45" style="width:33.75pt;">
        <col width="53" style="width:39.75pt;" span="2">
        <col width="52" style="width:39.00pt;">
        <col width="44" style="width:33.00pt;">
        <col width="41" style="width:30.75pt;">
        <col width="50" style="width:37.50pt;">
        <col width="64" style="width:48.00pt;">
        <col width="59" style="width:44.25pt;">
        <col width="72" style="width:54.00pt;">
      </colgroup>
      <tbody>
        <tr height="27">
          <td>报销人</td>
          <td colspan="3"></td>
          <td colspan="4">部 门</td>
          <td colspan="3"></td>
          <td colspan="2">出差事由</td>
          <td></td>
        </tr>
        <tr height="18">
          <td colspan="2">日 期</td>
          <td colspan="2">地 点</td>
          <td colspan="3">小车费</td>
          <td colspan="2">交通费</td>
          <td colspan="2">住宿费</td>
          <td rowspan="2">项目支出</td>
          <td rowspan="2">出差餐费</td>
          <td rowspan="2">合计</td>
        </tr>
        <tr height="30">
          <td>起</td>
          <td>讫</td>
          <td>起</td>
          <td>讫</td>
          <td>油费</td>
          <td>过路费</td>
          <td>停车费</td>
          <td>长途</td>
          <td>市内</td>
          <td>天数</td>
          <td>金额</td>
        </tr>
        <tr height="36">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
        <tr height="36">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
        <tr height="36">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
        <tr height="36">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
        <tr height="36">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
        <tr height="25">
          <td colspan="4">报销金额（人民币大写）</td>
          <td colspan="9">万 仟 佰 拾 元 角 分</td>
          <td></td>
        </tr>
        <tr height="30">
          <td colspan="10">报销方式：挂账（ ）冲账（ ） 银行支付（ ）现金支付（ ）</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr height="24">
          <td colspan="14" class="et13">开户单位： 开户银行： 银行账号：</td>
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
  letter-spacing: 3px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}
.name {
  width: 900px;
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
  width: 900px;
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
