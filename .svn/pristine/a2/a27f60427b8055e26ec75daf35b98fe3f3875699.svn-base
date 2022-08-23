import axios from '@/utils/axios'

/* 待审批的 */
export function getToExamineStepQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ToExamineStep/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改审批 */
export function getToExamineStepModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ToExamineStep/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 移交审核 */
export function getToExamineStepTransfer(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ToExamineStep/transfer', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 资产申请详情 */
export function getAssetsDetailsGetDataByApplyId(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/AssetsDetails/getDataByApplyId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 资产基本详情 --新增 */
export function getAssetsDetailsGetDataDetailsTwo(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/AssetsDetails/getDataDetailsTwo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 资产基本详情 --维修报废 */
export function getAssetsDetailsGetDataDetailsOne(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/AssetsDetails/getDataDetailsOne', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 转正详情 */
export function getCustomizedFormGetUserFormal(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/getUserFormal', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 离职详情 */
export function getCustomizedFormGetUserQuit(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/getUserQuit', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
