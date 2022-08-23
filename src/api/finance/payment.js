import axios from '@/utils/axios'

// 付款管理-查询（分页）
export function getPaymentFinanceQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/PaymentFinance/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 付款管理-新增
export function getPaymentFinanceAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/PaymentFinance/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 付款管理-修改
export function getPaymentFinanceModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/PaymentFinance/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 付款管理-删除
export function getPaymentFinanceDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/PaymentFinance/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 付款管理-提交审核
export function getPaymentFinanceApply(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/PaymentFinance/apply', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 付款管理-获取指定用户的已付款状态付款记录
export function getPaymentFinanceGetPaymentDataByUserId(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/PaymentFinance/getPaymentDataByUserId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 付款管理-审核明细
export function getPaymentFinanceGetDataById(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/PaymentFinance/getDataById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
