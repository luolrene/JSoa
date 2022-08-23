import axios from '@/utils/axios'

/* 分页查询 */
export function getOaProcessQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcess/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分类-修改 */
export function getOaProcessModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcess/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分类-新增 */
export function getOaProcessAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcess/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分类-删除 */
export function getOaProcessDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcess/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 具体-分页 */
export function getOaProcessStepsGetDataByFatherId(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcessSteps/getDataByFatherId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 具体-新建明细 */
export function getOaProcessStepsAddOrModifyd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcessSteps/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取所有职位 */
export function getPostGetAllName(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/post/getAllName', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取所有职位 */
export function getAllNameWhole(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/post/getAllNameWhole', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 具体-删除 */
export function getKnowledgePointsDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/knowledgePoints/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 树结构 */
export function getOaProcessGetChildrenSuper(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcess/getChildrenSuper', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取到二级 */
export function getOaProcessGetChildrenTwo(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OaProcess/getChildrenTwo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
