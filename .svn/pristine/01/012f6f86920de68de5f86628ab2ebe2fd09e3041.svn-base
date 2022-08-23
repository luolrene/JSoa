import axios from '@/utils/axios'

/* 分页获取列表 */
export function getTaskQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增 */
export function getTaskAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改 */
export function getTaskModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 删除 */
export function getTaskDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取任务树 */
export function getTaskGetChildren(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/getChildren', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取指定id下的数据 */
export function getTaskGetDataByFatherId(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/getDataByFatherId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 移交负责人 */
export function getTaskTransfer(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/transfer', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 延期申请 */
export function getTaskDelay(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/delay', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 查询单数据 */
export function getTaskGetDataById(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/getDataById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 申请任务详情 */
export function getTaskDetails(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Task/details', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 添加备注与评论 */
export function getTaskCommentAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/TaskComment/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取备注与评论 */
export function getTaskCommentQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/TaskComment/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 操作记录查询 */
export function getTaskLogQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/TaskLog/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
