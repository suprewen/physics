<template>
  <div>
    <el-form
      :model="loginForm"
      :rules="rules"
      class="login-form"
      ref="loginForm"
      label-width="80px"
    >
      <h3>物理实验平台</h3>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          type="text"
          v-model="loginForm.username"
          status-icon
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="loginForm.password"
          status-icon
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          round
          native-type="submit"
          type="primary"
          @click.prevent="submitForm()"
          :loading="loading"
        >登录</el-button>
        <el-button
          round
          @click="signupVisible = true"
        >注册</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="注册"
      :close-on-click-modal="false"
      :visible.sync="signupVisible"
      width="400px"
    >
      <signup @cancel="signupVisible = false"></signup>
    </el-dialog>
  </div>
</template>

<script>
import signup from './components/signup'

export default {
  name: "login",
  components: {
    signup
  },
  data () {
    let checkUserName = (rule, value, callback) => {
      if (!value) return callback(new Error('用户名不能为空'))
      callback()
    }
    let checkPassword = (rule, value, callback) => {
      if(value === '') callback(new Error('请输入密码'))
      else {
        if(value.length < 6) callback(new Error('密码长度不能小于6位'))
        else callback()
      }
    }
    return {
      loading: false,
      signupVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['loginForm'].validate(v => {
        if(v) {
          this.loading = true
          setTimeout(() => {
            window.console.log(this.qs.stringify(this.loginForm))
            this.loading = false
            this.$refs['loginForm'].resetFields()
          }, 1000)
          /* 
          TODO 发请求，如下，详情请看 axios 文档
          this.axios.post('url/url', this.qs.stringify(this.loginForm))
          */ 
        }
      })
      
    }
  }
}
</script>

<style lang="css" scoped>
.login-form {
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>