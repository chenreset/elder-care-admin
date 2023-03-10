import request from '@/utils/request'
export default {
  getArticleList (params) {
    return request({
      url: '/articles/list',
      method: 'post',
      data: params
    })
  },

  getArticleById (articleId) {
    return request({
      url: `/articles/getOneByArticleId?articleId=${articleId}`,
      method: 'get',
    })
  },
  getUserName () {
    return request({
      url: `/user/getInfo`,
      method: 'get',
    })
  },
  updateArticle (params) {
    console.log(params)
    return request({
      url: '/articles/update',
      method: 'post',
      data: params
    })
  },
  deleteArticle (articleId) {
    return request({
      url: `/articles/delete?articleId=${articleId}`,
      method: 'get',
    })
  }
}

