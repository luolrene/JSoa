import axios from '@/utils/axios'

/* 分类-结构树 */
export function getKnowledgeGetChildren(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Knowledge/getChildren', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分类-分页 */
export function getKnowledgeQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Knowledge/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分类-修改 */
export function getKnowledgeModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Knowledge/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分类-新增 */
export function getKnowledgeAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Knowledge/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分类-删除 */
export function getKnowledgeDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Knowledge/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 具体-分页 */
export function getKnowledgePointsQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/knowledgePoints/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 具体-新建 */
export function getKnowledgePointsAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/knowledgePoints/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 具体-修改 */
export function getKnowledgePointsModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/knowledgePoints/modify', params).then(res => {
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

/* 获取知识库 主页用 */
export function getKnowledgePointsHomePage(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/knowledgePoints/homePage', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
