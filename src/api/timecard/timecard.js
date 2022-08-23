import axios from '@/utils/axios'

/* 打卡结果 查询 */
export function getDingTalkPunchInResultQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dingTalkPunchInResult/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 打卡实时日志 */
export function getDingTalkAttendanceCheckRecordQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dingTalkAttendanceCheckRecord/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 每日打卡统计 */
export function getDingTalkReportFormResultQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dingTalkReportFormResult/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 每月打卡统计 */
export function getDingTalkReportFormResultMonthlyStatistics(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dingTalkReportFormResult/monthlyStatistics', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 手机号 月份查询  */
export function getDingTalkReportFormResultGetDataByMobileMonth(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dingTalkReportFormResult/getDataByMobileMonth', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 手机号 工作日查询  */
export function getDingTalkPunchInResultGetDataByMobileWorkDateStr(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dingTalkPunchInResult/getDataByMobileWorkDateStr', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
