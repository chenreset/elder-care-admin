import request from '@/utils/request'
export default {
  getUserList (params) {
    return request({
      url: '/user/getInfoPage',
      method: 'post',
      data: params
    })
  },
  updateUser (params) {
    params.username = null
    return request({
      url: '/user/update',
      method: 'post',
      data: params
    })
  },
  deleteUser (userId) {
    return request({
      url: `/user/delete?userId=${userId}`,
      method: 'get'
    })
  },
  getUserById (userId) {
    return request({
      url: `/user/getOneByUserId?userId=${userId}`,
      method: 'get',
    })
  },
}