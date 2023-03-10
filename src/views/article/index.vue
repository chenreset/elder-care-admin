<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="文章ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章封面" align="center">
        <template slot-scope="scope">
          <span>
            <img
              :src="scope.row.faceImage"
              alt="加载失败"
              height="100"
              width="100"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center" width="175">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <router-link :to="'/article/update/' + scope.row.id">
            <el-button type="primary">修改</el-button>
          </router-link>
          <el-popconfirm
            title="确定删除该记录吗？"
            @onConfirm="successconfirm(scope.row.id)"
          >
            <el-button slot="reference" type="danger">删除 </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" align="center">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="ArticlesPageVo.limit"
        @current-change="handleCurrentChange"
        @prev-click="handleCurrentChange"
        @next-click="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import article from '@/api/article'
export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      total: 0,
      ArticlesPageVo: {
        limit: 7,
        page: 1,
        order: "desc"
      },
      list: null,
      listLoading: true,
      remindIsShow: true
    }
  },
  created () {
    this.fetchData()
    // this.getUserName()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      // console.log(this.ArticlesPageVo)
      article.getArticleList(this.ArticlesPageVo).then(response => {
        this.list = response.data.allArticles
        this.listLoading = false
        this.total = response.data.allArticlesTotals
      })
    },
    handleCurrentChange (currentPage) {
      this.ArticlesPageVo.page = currentPage
      this.fetchData()
    },

    updateArticle (articleId) {
      article.updateArticle(articleId)
    },
    successconfirm (articleId) {
      console.log(articleId)
      article.deleteArticle(articleId).then(response => {
        this.remindIsShow = true
        this.fetchData()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
