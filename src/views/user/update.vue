<template>
  <div class="app-container">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="用户余额">
        <el-input v-model="userInfo.balance"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="userInfo.email" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input v-model="userInfo.phone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户年龄">
        <el-input v-model="userInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="用户地址">
        <el-input v-model="userInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="用户权限">
        <!-- <el-input v-bind="userInfo.permission"></el-input> -->
        <el-select v-model="userInfo.permission" placeholder="请选择">
          <el-option
            v-for="item in permission"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 头像图片上传 -->
    <label>更改头像</label>
    <el-upload
      class="avatar-uploader"
      :action="`http://localhost:8080/user/upload?userId=${this.$route.params.id}`"
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
import user from '@/api/admin_user'
export default {
  data () {
    return {
      imageUrl: '',
      size: '',
      userInfo: null,
      permission: [{ value: 1, label: 'common' }, { value: 2, label: 'admin' }]
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      console.log(this.$route.params.id)
      user.getUserById(this.$route.params.id).then(response => {
        this.userInfo = response.data.userInfo
        console.log(this.userInfo)
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
      console.log(this.userInfo.id)
      user.updateUser(this.userInfo).then((response) => {
        this.$message({
          type: 'success',
          message: '修改用户信息成功！'
        })
        this.$router.push({ path: '/user/list' })
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
