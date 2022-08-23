<template>
  <div class="pc-container" ref="time">
    <div class="addBtn" @click="exp()">
      添加
    </div>
    <div id="box">
      <div id="calendar" v-if="pickDay != null">
        <div class="pickDay">
          <span>{{pickDay}}</span>
          <span>日</span>
        </div>
        <!-- 年份 月份 -->
        <div class="month">
          <ul>
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">&#10094;</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-year">{{ currentYear }}</span>
              <span class="choose-month"> - {{ currentMonth }}</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">&#10095;</li>
          </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <li v-for="(day,index) in days" :key="index" @click="pick(day.day)">
            <!--本月-->
            <span class="momo_mark" v-if="day.memoType"></span>
            <span v-if="day.day.getMonth()+1 != currentMonth" class="other-month">{{ day.day.getDate() }}</span>
            <span v-else>
              <!--今天-->
              <span v-if="day.day.getFullYear() == new Date().getFullYear() && day.day.getMonth() == new Date().getMonth() && day.day.getDate() == new Date().getDate()" class="active">{{ day.day.getDate() }}</span>
              <span v-else>{{ day.day.getDate() }}</span>
            </span>
          </li>
        </ul>
      </div>
      <h5>备忘录</h5>
      <div v-if="currentMemo">
        <el-scrollbar class="page-component__scroll" style="height: 115px;">
          <div v-for="(memo,index) in currentMemo" :key="index">
            <div class="memo_list_s">
              <span class="circle"></span>
              <div class="memo_list_mont" @click="getMemo(memo)">{{memo.cont}}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { getMemoGetDataByUserId } from '@/api/home/home.js'
import { GMTToStr } from '@/utils/times'
import memoData from './memoData.vue'
import memo from './memo.vue'
export default {
  props: {
    time: Array
  },
  data() {
    return {
      fromVailData: {
        createUser: this.$store.getters.userInfo.id
      },
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      currentMemo: null,
      pickDay: null,
      memo_list: []
    }
  },
  methods: {
    // 添加按钮
    exp() {
      this.$layer.iframe({
        content: {
          content: memo, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: ['500px', '400px'],
        title: '添加备忘录',
        maxmin: true,
        shadeClose: false
      })
    },
    // 点击备忘录按钮
    getMemo(params) {
      this.$layer.iframe({
        content: {
          content: memoData, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: ['500px', '300px'],
        title: '备忘录',
        maxmin: true,
        shadeClose: false
      })
    },
    getListData() {
      getMemoGetDataByUserId({ createUser: this.$store.getters.userInfo.id }).then(res => {
        this.memo_list = res.result.map(xdd => {
          return xdd.memoTime
        })
        this.memo_list = Array.from(new Set(this.memo_list))
        let newDays = this.days.map(item => {
          return { day: GMTToStr(item.day), memoType: item.memoType }
        })
        newDays.forEach(xdd => {
          if (this.memo_list.includes(xdd.day)) {
            xdd.memoType = true
          }
          xdd.day = new Date(xdd.day)
        })
        this.days = newDays
      })
    },
    initCalendar(cur) {
      let date
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
        this.pickDay = date.getDate()
      }
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      var str = this.formatDate(this.currentYear, this.currentMonth, 1)
      this.currentWeek = new Date(str).getDay() === 0 ? 7 : new Date(str).getDay()
      this.days.length = 0 // 初始化数组
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str)
        var memoType = false
        d.setDate(d.getDate() - i)
        for (var j = 0; j < this.memo_list.length; j++) {
          var memoTime = new Date(this.memo_list[j]).getTime()
          if (d.getTime() === memoTime) {
            memoType = true
          }
        }
        this.days.push({ day: d, memoType: memoType })
      }
      for (let i = 1; i <= 42 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        let memoType = false
        for (let j = 0; j < this.memo_list.length; j++) {
          let memoTime = new Date(this.memo_list[j]).getTime()
          if (d.getTime() === memoTime) {
            memoType = true
          }
        }
        this.days.push({ day: d, memoType: memoType })
      }
    },
    pick(date) {
      this.pickDay = date.getDate()
      this.initCalendar(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, 1)
      )
      var curPickDay = this.formatDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
      let obj = {}
      obj.createUser = this.$store.getters.userInfo.id
      obj.memoTime = curPickDay
      getMemoGetDataByUserId(obj).then(res => {
        let datas = res.result.map(xdd => {
          return {
            cont: xdd.memoContent,
            id: xdd.id,
            time: xdd.memoTime
          }
        })
        this.currentMemo = datas
      })
    },
    pickPre(year, month) {
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initCalendar(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear(year, month) { },
    pickNext(year, month) {
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initCalendar(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    formatDate(year, month, day) {
      let y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
  },
  mounted() { },
  created() {
    this.getListData()
    this.initCalendar(null)
  }
}
</script>

<style scoped lang='scss'>
#box {
  width: 100%;
}
/*日历*/
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
#calendar {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.pickDay {
  margin: 0 auto;
  width: 100px;
  height: 65px;
  text-align: center;
}
.pickDay span {
  font-size: 12px;
  color: #989898;
}
.pickDay span:first-of-type {
  font-size: 72px;
  color: #789af7;
}
.month {
  width: 100%;
}
.month ul {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}
.year-month {
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.choose-year {
  font-size: 14px;
  color: #989898;
}
.choose-month {
  text-align: center;
  color: #989898;
  font-size: 14px;
}
.arrow {
  width: 28px;
  height: 28px;
  text-align: center;
}
.arrow:hover {
  background: rgba(100, 2, 12, 0.1);
  cursor: pointer;
}
.month ul li {
  color: #789af7;
  font-size: 20px;
}
.weekdays {
  width: 90%;
  margin: 0 auto 7.5px;
  display: flex;
  flex-wrap: wrap;
  color: #b8b8b8;
  justify-content: space-around;
}
.weekdays li {
  display: inline-block;
  font-size: 14px;
  font-weight: bolder;
  color: #789af7;
  width: 26px;
  text-align: center;
}
.days {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: #ffffff;
}
.days li {
  position: relative;
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding-bottom: 7.5px;
  padding-top: 7.5px;
  color: #999;
  cursor: pointer;
}
.days .momo_mark {
  position: absolute;
  right: 19px;
  top: 28px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7699f8;
}
.days li span {
  font-size: 16px;
}
.days li .active {
  font-weight: 600;
  font-size: 18px;
  color: #789af7;
}
.days li .other-month {
  padding: 5px;
  color: #e6e6e6;
}
.days li:hover {
  color: #789af7;
}
.days li:hover .other-month {
  color: #789af7;
}
/*备忘录*/
#memo {
  width: 100%;
}
#memo h5 {
  text-indent: 20px;
  height: 20px;
  line-height: 25px;
  font-size: 14px;
  color: #7699f8;
}
.memo_list li {
  margin-top: 12px;
}
.memo_list .memo_list_s {
  width: 399px;
}
.memo_list .memo_list_s:hover {
  background: #eee;
}
.memo_list .memo_list_s:hover .circle {
  background: #f84848;
}
.circle {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7699f8;
  vertical-align: top;
  margin-top: 14px;
}
.memo_list_mont {
  cursor: pointer;
  display: inline-block;
  text-align: left;
  width: 90%;
  min-height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #666666;
}
.memo_operate {
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  padding-top: 9px;
}
.memo_operate button {
  width: 12px;
  height: 12px;
  margin-right: 10px;
  background: #fff;
  border: none;
}
#addMemo {
  width: 96px;
  height: 28px;
  line-height: 28px;
  color: #789bf8;
  background: #fff;
  border: 1px solid #789bf8;
  border-radius: 2px;
  margin: 25px 0 0 20px;
}
.memo_cont {
  width: 310px;
  background: #7699f8;
  border-radius: 2px;
  margin-left: 20px;
  margin-top: 15px;
  padding: 37px 30px 24px 30px;
}
.memo_edit {
  width: 100%;
  min-height: 140px;
  line-height: 28px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  resize: none;
}
.edit_operate {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.edit_operate button {
  width: 20px;
  height: 20px;
  margin-left: 16px;
}
// 按钮
.addBtn {
  position: absolute;
  top: 30px;
  right: 50px;
  display: inline-block;
  width: 45px;
  height: 25px;
  background: #789af7;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
  border-radius: 10px;
  cursor: pointer;
}
.addBtn:hover {
  background: #fff;
  color: #789af7;
  border: 1px solid #789af7;
}
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
