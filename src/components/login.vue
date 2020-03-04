
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png"
             alt="logo图片加载失败">
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef"
               label-width="0px"
               class="form"
               :model="loginForm"
               :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    prefix-icon="iconfont icon-user" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    prefix-icon="iconfont icon-3702mima"
                    type="password" />
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">
            登录
          </el-button>
          <el-button type="info"
                     @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line semi
export default {
  data () {
    return {
      // 为表单绑定数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 为表单添加验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 为重置按钮添加重置方法
    reset () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 为登录按钮添加预校验方法
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 1.将登录成功之后的 token 保存到客户端的 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 1.1 项目中出了登录之外的其他 api 接口，必须登录之后才可以访问
        // 1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        // 2.通过编程，导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style en="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px;
}
img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.form {
  position: relative;
  bottom: 0;
  padding: 0 10px;
  box-sizing: border-box;
  top: 100px;
}
</style>
