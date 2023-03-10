<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px" :model="formLabelAlign">
      <el-form-item label="文章标题">
        <el-input v-model="articleInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="articleInfo.content"></el-input>
      </el-form-item>
      <el-form-item label="文章作者">
        <el-input v-model="articleInfo.username"></el-input>
      </el-form-item>
    </el-form>

    <!-- 文章封面图片上传 -->
    <label>更改封面</label>
    <el-upload
      class="avatar-uploader"
      :action="`http://localhost:8080/articles/upload?articleId=${this.$route.params.id}`"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button slot="reference" type="primary" @click="confirmUpdate"
      >确认修改
    </el-button>
  </div>
</template>



<script>
import article from '@/api/article'
export default {
  data () {
    return {
      imageUrl: '',
      size: '',
      articleInfo: null
    }
  },
  created () {
    this.getArticleInfo()
  },
  methods: {
    getArticleInfo () {
      article.getArticleById(this.$route.params.id).then(response => {
        console.log(response)
        this.articleInfo = response.data.articleById
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
      article.updateArticle(this.articleInfo).then((response) => {
        this.$message({
          type: 'success',
          message: '修改文章信息成功！'
        })
        this.$router.push({ path: '/article/list' })
      })
    }
  }
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
