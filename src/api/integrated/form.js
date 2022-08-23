import axios from '@/utils/axios'

/* 分页查询 */
export function getCustomerFormQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomerForm/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新建 */
export function getCustomerFormAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomerForm/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 修改 */
export function getCustomerFormModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomerForm/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 删除 */
export function getCustomerFormDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomerForm/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取指定id下的表格 */
export function getCustomerFormGetDataById(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomerForm/getDataById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取指定id下的表格 */
export function getCustomerFormGetDataByProcessId(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomerForm/getDataByProcessId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
