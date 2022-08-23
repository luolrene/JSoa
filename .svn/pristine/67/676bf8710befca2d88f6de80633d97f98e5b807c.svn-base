import axios from '@/utils/axios'

// 招待管理（分页）
export function getEntertainQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Entertain/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 招待管理（新增）
export function getEntertainAddNewData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Entertain/addNewData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 招待管理（修改）
export function getEntertainModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Entertain/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 招待管理（删除）
export function getEntertainDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Entertain/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 招待管理（提交）
export function getEntertainApply(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Entertain/apply', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取招待数据
export function getEntertainGetDataByUserIdState(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Entertain/getDataByUserIdState', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 通过applyId获取详情
export function getEntertainGetDataByApplyId(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Entertain/getDataByApplyId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
