import axios from '@/utils/axios'

/* 分页获取列表 */
export function getPositionRankQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/positionRank/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新建 */
export function getPositionRankAdd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/positionRank/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改 */
export function getPositionRankModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/positionRank/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除 */
export function getPositionRankDel (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/positionRank/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 类型设置分页查询 */
export function getDictionariesQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dictionaries/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增职级类型 */
export function getDictionariesAdd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dictionaries/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改职级类型 */
export function getDictionariesModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dictionaries/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 删除职级类型 */
export function getDictionariesDel (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dictionaries/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取职级类型列表 */
export function getDictionariesGetByCode (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/dictionaries/getByCode', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
