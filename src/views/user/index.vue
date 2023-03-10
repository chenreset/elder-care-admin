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
      <el-table-column align="center" label="用户ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="150" align="center">
        <template slot-scope="scope">
          <span>
            <img
              :src="scope.row.avatarImage"
              alt="加载失败"
              height="100"
              width="100"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column label="电话" align="center" width="175">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column label="上次登录时间" align="center" width="175">
        <template slot-scope="scope">
          {{ scope.row.lastlogin }}
        </template>
      </el-table-column>
      <el-table-column label="用户权限" align="center">
        <template slot-scope="scope">
          {{ scope.row.permission }}
        </template>
      </el-table-column>
      <el-table-column label="账户余额" align="center">
        <template slot-scope="scope">
          {{ scope.row.balance }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <router-link :to="'/user/update/' + scope.row.id">
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
        :page-size="UserPageVo.limit"
        @current-change="handleCurrentChange"
        @prev-click="handleCurrentChange"
        @next-click="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import user from '@/api/admin_user'
export default {
  data () {
    return {
      total: 0,
      UserPageVo: {
        limit: 3,
        page: 1,
      },
      list: null,
      listLoading: true,
      remindIsShow: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      user.getUserList(this.UserPageVo).then(response => {
        this.list = response.data.userList
        this.listLoading = false
        this.total = response.data.allUserTotals
        console.log(this.total)
      })
    },
    handleCurrentChange (currentPage) {
      this.UserPageVo.page = currentPage
      this.fetchData()
    },

    updateUser (userId) {
      user.updateUser(userId)
    },
    successconfirm (userId) {
      console.log(userId)
      user.deleteUser(userId).then(response => {
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
