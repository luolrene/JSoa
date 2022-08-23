import axios from '@/utils/axios'

/* 分页获取列表 */
export function getPostQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/post/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新建 */
export function getPostAddGroup (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/post/addGroup', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改 */
export function getPostModifyGroup (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/post/modifyGroup', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除 */
export function getPostDel (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/post/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取指定部门下的职位 */
export function getPostgetDataByGroupId (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/post/getDataByGroupId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
