import request from '@/utils/request'
export default {
  getGoodList (params) {
    return request({
      url: '/goods/list',
      method: 'post',
      data: params
    })
  },

  getGoodById (goodId) {
    return request({
      url: `/good/getById?articleId=${goodId}`,
      method: 'get',
    })
  },
  getUserName () {
    return request({
      url: `/user/getInfo`,
      method: 'get',
    })
  },
  updateGood (params) {
    console.log(params)
    return request({
      url: '/goods/update',
      method: 'post',
      data: params
    })
  },
  deleteGood (goodId) {
    return request({
      url: `/goods/delete?goodId=${goodId}`,
      method: 'get',
    })
  }
}

