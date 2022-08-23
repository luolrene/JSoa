import axios from '@/utils/axios'

// 采购管理-查询（分页）
export function getPurchaseQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 提交审核
export function getPurchaseApply(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/apply', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 采购管理-新增  修改
export function getPurchaseAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getPurchaseModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 采购管理-删除
export function getPurchaseDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取对应的申请数据
export function getPurchaseGetDataById(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/getDataById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取对应的申请人
export function getPurchaseReviewedBy(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/reviewedBy', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取采购专员对应角色用户
export function getPurchaseCommissioner(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/commissioner', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取指定用户的已通过的采购记录
export function getPurchaseGetAdoptDataByUserId(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/getAdoptDataByUserId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取当前用户的挂账报销
export function getReimbursementGetDataByUserState(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Reimbursement/getDataByUserState', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 采购专员修改采购数据
export function getPurchaseModifyActualMoneyState(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Purchase/modifyActualMoneyState', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
