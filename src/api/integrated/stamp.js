import axios from '@/utils/axios'

/* 分页查询 */
export function getOfficialSealQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OfficialSeal/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 新增 */
export function getOfficialSealAdd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OfficialSeal/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 修改 */
export function getOfficialSealModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OfficialSeal/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 删除 */
export function getOfficialSealDel(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/OfficialSeal/del', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
