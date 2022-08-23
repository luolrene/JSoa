import axios from '@/utils/axios'

/* 分页获取列表  提交的审核记录 */
export function getToExamineQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ToExamine/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 提交新的申请 */
export function getApplyAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Apply/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除提交的审核申请 */
export function getToExamineDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ToExamine/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改 */
export function getToExamineModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ToExamine/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 查询审核节点及其人员 */
export function getToExamineStructure(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ToExamine/structure', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 提交离职申请 */
export function getCustomizedFormAddUserQuit(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/addUserQuit', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 提交转正申请 */
export function getCustomizedFormAddUserFormal(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/addUserFormal', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新建调岗申请 */
export function getCustomizedFormAddAdjustPosition(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/addAdjustPosition', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 提交调岗申请 */
export function getCustomizedFormGetAdjustPosition(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/getAdjustPosition', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 提交请假申请 */
export function getCustomizedFormAddCustomizedLeave(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/addCustomizedLeave', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 查询审核详情 */
export function getCustomizedFormGetCustomizedLeave(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CustomizedForm/getCustomizedLeave', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
