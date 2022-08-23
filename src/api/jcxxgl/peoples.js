import axios from '@/utils/axios'

/* 员工在职状态 */
export function getUserSumOnTheJobStatus (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumOnTheJobStatus', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 员工学历分布 */
export function getUserSumEducation (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumEducation', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 员工年龄分布 */
export function getUserSumBirthTime (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumBirthTime', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 入职 离职 在职 */
export function getUserSumInauguration (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumInauguration', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 职级 */
export function getUserSumAdministrativeRank (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumAdministrativeRank', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 婚姻性别 */
export function getUserSumMaritalStatus (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumMaritalStatus', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 员工司龄 */
export function getUserSumWorkingYears (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumWorkingYears', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 职级统计 */
export function getUserSumRankLev (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/sumRankLev', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
