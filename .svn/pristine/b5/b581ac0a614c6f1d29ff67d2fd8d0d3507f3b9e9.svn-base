import axios from '@/utils/axios'

/* 查询 */
export function getHomeHonorWallQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeHonorWall/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* -修改 */
export function getHomeHonorWallModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeHonorWall/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* -新增 */
export function getHomeHonorWallAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeHonorWall/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* -删除 */
export function getHomeHonorWallDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeHonorWall/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
