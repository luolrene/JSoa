<!-- 借款申请单 -->
<template>
  <div class="form" ref="table">
    <img src="../../static/img/login/logo_1.png" alt="" width="130">
    <div class="title">
      <div class="firm">重庆市九升检测技术有限公司</div>
      <div class="name">
        <span class="type">借款审批单</span>
        <span class="time">
          <b>{{year}}</b>年
          <b>{{month}}</b>月
          <b>{{day}}</b>日
        </span>
      </div>
      <span class="no" v-if='params.loanNumber'>{{params.loanNumber}}</span>
    </div>
    <table style="width:534.77pt">
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
            <span>部门：
              <b>{{params.groupName}}</b>
            </span>
            <span class="ml50">借款申请人：
              <b>{{params.createUserName}}</b>
            </span>
            <span class="ml50">需要办理时间：
              <b>{{params.borrowingDemandTime}}</b>
            </span>
            <span class="ml50">附件张数：1
            </span>
          </td>
        </tr>
        <tr height="20" class="et10 tlc">
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
        <tr height="40" class="et10 tlc">
          <td colspan="5"><b>{{params.borrowingCause}}</b> </td>
          <td><b>{{a1[8]}}</b></td>
          <td><b>{{a1[7]}}</b></td>
          <td><b>{{a1[6]}}</b></td>
          <td><b>{{a1[5]}}</b></td>
          <td><b>{{a1[4]}}</b></td>
          <td><b>{{a1[3]}}</b></td>
          <td><b>{{a1[2]}}</b></td>
          <td><b>{{a1[1]}}</b></td>
          <td><b>{{a1[0]}}</b></td>
        </tr>
        <!-- 第二排 -->
        <tr height="40" class="et10 tlc">
          <td colspan="5"><b>{{params.borrowingCause2}}</b></td>
          <td><b>{{b1[8]}}</b></td>
          <td><b>{{b1[7]}}</b></td>
          <td><b>{{b1[6]}}</b></td>
          <td><b>{{b1[5]}}</b></td>
          <td><b>{{b1[4]}}</b></td>
          <td><b>{{b1[3]}}</b></td>
          <td><b>{{b1[2]}}</b></td>
          <td><b>{{b1[1]}}</b></td>
          <td><b>{{b1[0]}}</b></td>
        </tr>
        <tr height="40" class="et10 tlc">
          <td colspan="5"><b>{{params.borrowingCause3}}</b></td>
          <td><b>{{c1[8]}}</b></td>
          <td><b>{{c1[7]}}</b></td>
          <td><b>{{c1[6]}}</b></td>
          <td><b>{{c1[5]}}</b></td>
          <td><b>{{c1[4]}}</b></td>
          <td><b>{{c1[3]}}</b></td>
          <td><b>{{c1[2]}}</b></td>
          <td><b>{{c1[1]}}</b></td>
          <td><b>{{c1[0]}}</b></td>
        </tr>
        <tr height="40" class="et10 tlc">
          <td colspan="5"><b>{{params.borrowingCause4}}</b></td>
          <td><b>{{d1[8]}}</b></td>
          <td><b>{{d1[7]}}</b></td>
          <td><b>{{d1[6]}}</b></td>
          <td><b>{{d1[5]}}</b></td>
          <td><b>{{d1[4]}}</b></td>
          <td><b>{{d1[3]}}</b></td>
          <td><b>{{d1[2]}}</b></td>
          <td><b>{{d1[1]}}</b></td>
          <td><b>{{d1[0]}}</b></td>
        </tr>
        <tr height="46" class="et10">
          <td colspan="5" class="et16">合计金额（人民币大写）：
            <b>{{this.dealBigMoney(zj)}}</b>
          </td>
          <td class="tlc"><b>{{z1[8]}}</b></td>
          <td class="tlc"><b>{{z1[7]}}</b></td>
          <td class="tlc"><b>{{z1[6]}}</b></td>
          <td class="tlc"><b>{{z1[5]}}</b></td>
          <td class="tlc"><b>{{z1[4]}}</b></td>
          <td class="tlc"><b>{{z1[3]}}</b></td>
          <td class="tlc"><b>{{z1[2]}}</b></td>
          <td class="tlc"><b>{{z1[1]}}</b></td>
          <td class="tlc"><b>{{z1[0]}}</b></td>
        </tr>
        <tr height="36">
          <td colspan="14" class="et16">支付方式: 现金（
            <b v-if="params.payment==='1'">√</b>
            ） 银行（
            <b v-if="params.payment==='2'">√</b>
            ）
          </td>
        </tr>
        <tr height="40">
          <td colspan="14" class="et16">
            <span>开户单位（人）：
              <b>{{params.bankUser}}</b>
            </span>
            <span class="ml50">开户银行：
              <b>{{params.bank}}</b>
            </span>
            <span class="ml50">银行账号：
              <b>{{params.bankAccount}}</b>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="foot">
      <span>部门经理：
        <b>{{reviewed[0]}}</b>
      </span>
      <span>财务经理：
        <b>{{reviewed[1]}}</b>
      </span>
      <span>总经理：
        <b>{{reviewed[2]}}</b>
      </span>
    </div>
    <el-button size="mini" class="el-icon-printer btn" @click="printJson">打印</el-button>
  </div>
</template>

<script>
import { getFinanceLoanReviewedBy } from '@/api/finance/borrow.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      a1: [],
      b1: [],
      c1: [],
      d1: [],
      z1: [],
      zj: '',
      year: '',
      month: '',
      day: '',
      reviewed: []
    }
  },
  methods: {
    printJson() {
      let btn = document.querySelector('.btn')
      btn.style.display = 'none'
      this.$print(this.$refs.table)
    },
    // 审批人
    getReviewed() {
      getFinanceLoanReviewedBy({
        customFormId: this.params.id,
        customFormType: 9
      }).then(res => {
        let reviewed = res.result
        this.reviewed = reviewed.map(item => {
          return item.applyUserName
        })
      })
    },
    // 金额转换
    getNum(a) {
      a = a.replace(/[.。]+/g, '')
      let d1 = (a + '').split('').map(Number)
      d1 = d1.reverse()
      d1[d1.length] = '￥'
      return d1
    },

    // 小写金额转大写
    dealBigMoney(n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return '数据非法'
      let fraction = ['角', '分'];
      let digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
      ];
      let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ];
      let head = n < 0 ? '欠' : '';
      n = Math.abs(n);
      let s = '';
      for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
      }
      s = s || '整';
      n = Math.floor(n);
      for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
      }
      return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
    }
  },
  mounted() {
    this.getReviewed()
    // 申请时间
    this.year = this.params.createTime.substring(0, 4)
    this.month = this.params.createTime.substring(5, 7)
    this.day = this.params.createTime.substring(8, 10)
    // 合计金额
    this.zj = this.params.sumBorrowingBalance
    let z = this.params.sumBorrowingBalance
    this.z1 = this.getNum(z)
    // 申请金额
    let a = this.params.borrowingBalance
    this.a1 = this.getNum(a)
  },
  created() { }
}
</script>

<style scoped lang="scss">
.form {
  width: 700px;
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
  font-weight: 700;
}
.name {
  margin-top: 10px;
  width: 700px;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  margin-right: 0;
  color: #000;
}
.time {
  margin-left: 185px;
}
.foot {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
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
.tlc {
  text-align: center;
}
.no {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 14px;
  color: #f75656;
}
b {
  font-family: fangsong;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}
</style>
