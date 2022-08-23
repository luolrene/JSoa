import axios from '@/utils/axios'

export function getSysQueryWorkbench (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/sys/queryWorkbench', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 分页查询
export function getMsgQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 删除
export function getMsgDelMsgs (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/delMsgs', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改单条数据为已读
export function getMsgSetMsgHasRead (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/setMsgHasRead', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 单条查询信息
export function getMsgQueryOneMsgById (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/queryOneMsgById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 单条数量
export function getMsgQueryNoReadNum (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/queryNoReadNum', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 消息通知已读
export function getNoticeRead (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/notice/read', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 用户银行查询
export function getUserBankQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/UserBank/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 用户银行新增
export function getUserBankAdd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/UserBank/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 用户银行修改
export function getUserBankModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/UserBank/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 用户银行删除
export function getUserBankDel (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/UserBank/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取指定用户对应银行卡信息
export function getAssetsMaintenanceGetDataByUserId (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/AssetsMaintenance/getDataByUserId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 日历--查询
export function getMemoGetDataByUserId (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Memo/getDataByUserId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 日历--添加
export function getMemoAdd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Memo/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 日历--删除
export function getMemoDel (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Memo/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
