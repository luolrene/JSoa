import axios from '@/utils/axios'

/* 查询 */
export function getHomeRotationPictureQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeRotationPicture/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* -修改 */
export function getHomeRotationPictureModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeRotationPicture/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* -新增 */
export function getHomeRotationPictureAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeRotationPicture/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* -删除 */
export function geHomeRotationPictureDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/HomeRotationPicture/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
