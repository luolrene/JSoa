<!-- eslint-disable vue/valid-v-else -->
<template>
  <div class="pc-container">
    <div id="box">
      <el-row :gutter="20">
        <el-col :span="10">
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
              <li v-for="(day,index) in dayss" :key="index" @click="pick(day.day)">
                <!--本月-->
                <span class="momo_mark_1" v-if="day.memoType &&day.style==='正常'"></span>
                <span class="momo_mark_2" v-else-if="day.memoType&&['旷工','迟到','上班缺卡','下班缺卡','上班外勤','下班外勤'].includes(day.style)"></span>
                <span class="momo_mark_3" v-else-if="day.memoType&&['请假','加班','出差','外出'].includes(day.style)"></span>
                <span v-else></span>
                <span v-if="day.day.getMonth()+1 != currentMonth" class="other-month">{{ day.day.getDate() }}</span>
                <span v-else>
                  <!--今天-->
                  <span v-if="day.day.getFullYear() == new Date().getFullYear() && day.day.getMonth() == new Date().getMonth() && day.day.getDate() == new Date().getDate()" class="active">{{ day.day.getDate() }}</span>
                  <span v-else>{{ day.day.getDate() }}</span>
                </span>
              </li>
            </ul>
          </div>
          <div class="explain">
            <div>
              <i class="smallicon" style="background:#789af7"></i>
              <span>全天考勤正常</span>
            </div>
            <div>
              <i class="smallicon" style=";background:#ffc876"></i>
              <span>当天存在异常:迟到、早退、缺卡、旷工、外勤</span>
            </div>
            <div>
              <i class="smallicon" style="background:#9f9f9f"></i>
              <span>当天提交过:请假、加班、出差、外出</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="list_title">打卡情况</div>
          <div class="user_name">考勤人:{{params.name}}-{{params.typeName}}-{{params.groupName}}-{{params.administrativeRankName}}</div>
          <div class="classes">考勤状况:<span v-if="stratData.attend_result"></span>{{stratData.attend_result}}</div>
          <div class="classes">当日班次:<span v-if="stratData.plan_detail">{{stratData.plan_detail}}</span></div>
          <div class="classes">打卡情况:
            <span v-if="currentMemo.length>1">上班:<span style="color: #789af7;font-size: 14px;"> {{currentMemo[0].timeResult}}</span> 下班:<span style="color: #789af7;font-size: 14px;"> {{currentMemo[1].timeResult}}</span>
            </span>
          </div>

          <div class="list_text">
            <!-- <p>当日班次:</p>
            <p>出勤统计:</p> -->
          </div>
          <div class="timeline">
            <el-timeline>
              <el-timeline-item timestamp="上班打卡时间" placement="top">
                <el-card>
                  <div style="margin-bottom:10px" v-if="currentMemo.length>0&&currentMemo[0].locationResult==='Normal' "><i class="el-icon-time"></i>{{currentMemo[0].userCheckTimeStr}}</div>
                  <div style="margin-bottom:10px" v-else-if="currentMemo.length>0&&currentMemo[0].locationResult==='NotSigned'"><i class="el-icon-time"></i>未打卡，无打卡时间</div>
                  <div style="margin-bottom:10px" v-else><i class="el-icon-time"></i>未打卡，无打卡时间</div>
                  <div v-if="currentMemo.length>0&&currentMemo[0].locationResult==='Normal'"><i class="el-icon-location-information"></i>在规定考勤范围内打卡</div>
                  <div v-else-if="currentMemo.length>0&&currentMemo[0].locationResult==='Outside'"><i class="el-icon-time"></i>在规定考勤范围外打卡</div>
                  <div v-else><i class="el-icon-location-information"></i>未打卡，无打卡地点</div>

                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="下班打卡时间" placement="top">
                <el-card>
                  <div style="margin-bottom:10px" v-if="currentMemo.length>0&&currentMemo[1].locationResult==='Normal' "><i class="el-icon-time"></i>{{currentMemo[1].userCheckTimeStr}}</div>
                  <div style="margin-bottom:10px" v-else-if="currentMemo.length>0&&currentMemo[1].locationResult==='NotSigned'"><i class="el-icon-time"></i>未打卡，无打卡时间</div>
                  <div style="margin-bottom:10px" v-else><i class="el-icon-time"></i>未打卡，无打卡时间</div>
                  <div v-if="currentMemo.length>0&&currentMemo[1].locationResult==='Normal'"><i class="el-icon-location-information"></i>在规定考勤范围内打卡</div>
                  <div v-else-if="currentMemo.length>0&&currentMemo[1].locationResult==='Outside'"><i class="el-icon-time"></i>在规定考勤范围外打卡</div>
                  <div v-else><i class="el-icon-location-information"></i>未打卡，无打卡地点</div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="list_title">月统计</div>
          <div class="boxs">
            <div class="box" v-for="(item,index) in datas" :key="index">
              <p class="box_sum">{{item.sum}}</p>
              <p class="box_type">{{item.name}}</p>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { getDingTalkReportFormResultQueryPageData, getDingTalkReportFormResultGetDataByMobileMonth, getDingTalkPunchInResultGetDataByMobileWorkDateStr } from '@/api/timecard/timecard.js'
import { GMTToStr } from '@/utils/times'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      fromVailData: {
        createUser: this.$store.getters.userInfo.id
      },
      datas: [],
      sumData: [],
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      stratData: {},
      days: [],
      dayss: [],
      currentMemo: [],
      pickDay: null,
      memo_list: [],
      typeData: []
    }
  },
  methods: {
    getListData(a) {
      getDingTalkReportFormResultGetDataByMobileMonth({ mobile: this.params.mobile, type: this.params.type, timeMonth: a }).then(res => {
        res.result.forEach(xdd => {
          if (xdd.attend_result.indexOf('正常') !== -1) {
            xdd.attend_result = '正常'
          } else if (xdd.attend_result.indexOf('迟到') !== -1) {
            xdd.attend_result = '迟到'
          } else if (xdd.attend_result.indexOf('调休') !== -1) {
            xdd.attend_result = '请假'
          } else if (xdd.attend_result.indexOf('产假') !== -1) {
            xdd.attend_result = '请假'
          } else if (xdd.attend_result.indexOf('病假') !== -1) {
            xdd.attend_result = '请假'
          } else if (xdd.attend_result.indexOf('婚假') !== -1) {
            xdd.attend_result = '请假'
          } else if (xdd.attend_result.indexOf('丧假') !== -1) {
            xdd.attend_result = '请假'
          } else if (xdd.attend_result.indexOf('加班') !== -1) {
            xdd.attend_result = '加班'
          } else if (xdd.attend_result.indexOf('出差') !== -1) {
            xdd.attend_result = '出差'
          } else if (xdd.attend_result.indexOf('外出') !== -1) {
            xdd.attend_result = '外出'
          } else if (xdd.attend_result.indexOf('年假') !== -1) {
            xdd.attend_result = '请假'
          }
          xdd.memoTime = xdd.time.slice(0, -9)
        })
        this.memo_list = res.result.map((xdd) => {
          return xdd.memoTime
        })
        let newTimes = res.result.map(xdd => {
          return {
            time: xdd.memoTime,
            style: xdd.attend_result
          }
        })
        let newDays = this.days.map((item) => {
          return { day: GMTToStr(item.day), memoType: item.memoType }
        })
        newDays.forEach(xdd => {
          newTimes.forEach(item => {
            if (this.memo_list.includes(xdd.day)) {
              xdd.memoType = true
            }
            if (GMTToStr(xdd.day) === item.time) {
              xdd.style = item.style
            }
          })
          xdd.day = new Date(xdd.day)
        })
        this.dayss = newDays
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
      this.currentWeek =
        new Date(str).getDay() === 0 ? 7 : new Date(str).getDay()
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
      this.getListData(GMTToStr(date))
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
      this.getDayData(curPickDay)
    },
    // 获取天 打卡
    getDayData(day) {
      let obj = {}
      obj.mobile = this.params.mobile
      obj.type = this.params.type
      obj.workDateStr = day
      getDingTalkPunchInResultGetDataByMobileWorkDateStr(obj).then((res) => {
        res.result.forEach(xdd => {
          switch (xdd.timeResult) {
            case 'Early':
              xdd.timeResult = '正常'
              break
            case 'Normal':
              xdd.timeResult = '正常'
              break
            case 'Late':
              xdd.timeResult = '早退'
              break
            case 'SeriousLate':
              xdd.timeResult = '迟到'
              break
            case 'Absenteeism':
              xdd.timeResult = '严重迟到'
              break
            case 'NotSigned':
              xdd.timeResult = '未打卡'
          }
        })
        this.currentMemo = res.result
      }).then(() => {
        let newObj = obj
        newObj.pageSize = 1
        newObj.pageNow = 1
        newObj.timeEnd = day
        newObj.timeStart = day
        getDingTalkReportFormResultQueryPageData(newObj).then(res => {
          if (res.result.pageList.length > 0) {
            this.stratData = res.result.pageList[0]
          } else {
            this.stratData = {}
          }
        })
      })
    },
    pickPre(year, month) {
      let months = month - 1
      if (months < 10) {
        months = '0' + months
      }
      this.getListData(year + '-' + months)
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initCalendar(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear(year, month) {
    },
    pickNext(year, month) {
      let months = month + 1
      if (months < 10) {
        months = '0' + months
      }
      this.getListData(year + '-' + months)
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
  mounted() {
    this.datas = [
      { name: '出勤天数', sum: this.params.attendance_days },
      { name: '工作时长', sum: this.params.attendance_work_time },
      { name: '迟到次数', sum: this.params.late_times },
      { name: '迟到时长', sum: this.params.late_minute },
      { name: '严重迟到次数', sum: this.params.absenteeism_late_times },
      { name: '严重迟到时长', sum: this.params.serious_late_minute },
      { name: '早退次数', sum: this.params.leave_early_times },
      { name: '早退时长', sum: this.params.leave_early_minute },
      { name: '缺卡次数', sum: Number(this.params.on_work_lack_card_times) + Number(this.params.off_work_lack_card_times) },
      { name: '旷工天数', sum: this.params.absenteeism_days },
      { name: '出差时长', sum: this.params.business_trip_time },
      { name: '外出时长', sum: this.params.out_time }
    ]
  },
  created() {
    this.getListData()
    this.initCalendar(null)
    if (this.params.type === 'jsjc') {
      this.params.typeName = '九升检测'
    } else if (this.params.type === 'lsst') {
      this.params.typeName = '两山生态'
    }
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
  width: 130px;
  height: 65px;
  text-align: center;
}
.pickDay span {
  font-size: 18px;
  color: #989898;
}
.pickDay span:first-of-type {
  font-size: 60px;
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
  font-size: 22px;
  color: #789af7;
}
.choose-month {
  text-align: center;
  color: #789af7;
  font-size: 22px;
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
  height: 40px;
  text-align: center;
  padding-bottom: 7.5px;
  padding-top: 7.5px;
  color: #999;
  cursor: pointer;
}
.days .momo_mark_1 {
  position: absolute;
  right: 19px;
  top: 28px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7699f8;
}
.days .momo_mark_2 {
  position: absolute;
  right: 19px;
  top: 28px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ffc876;
}
.days .momo_mark_3 {
  position: absolute;
  right: 19px;
  top: 28px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #9f9f9f;
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

.list_title {
  margin-bottom: 40px;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #585858;
}
.user_name {
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 500;
}
.classes {
  margin-bottom: 5px;
  font-size: 16px;
}
.list_text {
  p {
    margin: 5px 0;
    font-size: 14px;
  }
}
.timeline {
  margin-top: 20px;
}
.boxs {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 80%;
  .box {
    text-align: center;
    line-height: 50px;
    margin: 5px;
    width: 22%;
    height: 120px;
    background: #789af7;
    transition: 1000ms all;
    border-radius: 5px;

    cursor: pointer;
    .box_sum {
      margin-top: 20px;
      font-size: 26px;
      font-weight: bolder;
      color: #fff;
    }
    .box_type {
      color: #fff;
      font-size: 16px;
    }
  }
  .box:hover {
    background: #fff;
    border: 2px solid #789af7;
    border-radius: 30px;
    .box_sum {
      color: #789af7;
    }
    .box_type {
      color: #789af7;
    }
  }
}

.explain {
  margin-top: 20px;
  padding: 10px;
  height: 90px;
  font-size: 14px;
  line-height: 30px;
  background: #f7f7f7;
  .smallicon {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
  }
}
</style>
