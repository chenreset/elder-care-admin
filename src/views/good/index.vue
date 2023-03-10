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
      <el-table-column align="center" label="商品ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="300">
        <template slot-scope="scope">
          {{ scope.row.goodsName }}
        </template>
      </el-table-column>
      <el-table-column label="商品价格" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品封面" align="center" width="150">
        <template slot-scope="scope">
          <span>
            <img
              :src="scope.row.goodsImg"
              alt="还未上传照片"
              height="100"
              width="100"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsDescription }}
        </template>
      </el-table-column>

      <el-table-column label="联系方式" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactInformation }}
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center" width="175">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="openUpdateBox(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            title="确定删除该记录吗？"
            @onConfirm="successconfirm(scope.row.goodsId)"
          >
            <el-button slot="reference" type="danger">删除 </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

      <!-- 浮窗 -->
      <el-dialog
        title="修改商品信息"
        append-to-body
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="goodForm">
          <el-form-item label="商品名称">
            <el-input v-model="goodForm.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodForm.goodsPrice"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="goodForm.goodsDescription"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="goodForm.contactInformation"></el-input>
          </el-form-item>
          <el-form-item label="商品封面">
            <!-- <label>当前封面照片</label> -->
            <div>
              <!-- <img :src="goodForm.goodsImg" alt="无照片" /> -->
              <el-upload
                class="avatar-uploader"
                :action="`http://localhost:8080/goods/upload?goodId=${goodForm.goodsId}`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmUpdate()"
            >确认修改</el-button
          >
        </div>
      </el-dialog>
      <!-- 浮窗结束 -->
    </el-table>

    <!-- 分页 -->
    <div class="block" align="center">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="goodsPageVo.limit"
        @current-change="handleCurrentChange"
        @prev-click="handleCurrentChange"
        @next-click="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import good from '@/api/good'
export default {
  data () {
    return {
      dialogFormVisible: false,
      total: 0,
      goodsPageVo: {
        page: 1,
        limit: 5,
        order: "default",
        priceMin: 0,
        priceMax: 0
      },
      goodForm: {
      },
      oneGood: null,
      list: null,
      listLoading: true,
      imageUrl: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      good.getGoodList(this.goodsPageVo).then(response => {
        this.list = response.data.GoodsPage.records
        this.listLoading = false
        this.total = response.data.GoodsPage.total
      })
    },
    openUpdateBox (good) {
      console.log(good)
      this.dialogFormVisible = true
      this.goodForm = good
      console.log("goodForm" + this.goodForm.gmtCreate)
    },
    handleCurrentChange (currentPage) {
      this.goodsPageVo.page = currentPage
      this.fetchData()
    },
    updateGood (goodId) {
      good.updateGood(goodId)
    },
    successconfirm (goodId) {
      console.log(goodId)
      good.deleteGood(goodId).then(response => {
        this.remindIsShow = true
        this.fetchData()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    confirmUpdate () {
      good.updateGood(this.goodForm).then((response) => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '修改商品信息成功！'
        })
        // this.$router.push({ path: '/article/list' })
      })
    }


  },


}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
